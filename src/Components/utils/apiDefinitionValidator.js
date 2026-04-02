export const STATIC_FALLBACK_CONSTRAINTS = {
  base_url_must_be_https: true,
  allowed_methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
  allowed_variable_types: ["string", "integer", "number", "boolean", "array", "object"],
  min_modules: 1,
  min_operations_per_module: 1,
  required_top_level_keys: ["api_name", "version", "base_url", "modules"],
};

export const API_METHOD_ENUM = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"];
export const API_VARIABLE_TYPE_ENUM = ["string", "integer", "number", "boolean", "array", "object"];

export const VENDOR_API_DEFINITION_JSON_SCHEMA = Object.freeze({
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://example.com/schemas/vendor-api-definition.schema.json",
  title: "Vendor API Definition",
  type: "object",
  additionalProperties: false,
  required: ["api_name", "version", "base_url", "modules"],
  properties: {
    api_name: { type: "string", minLength: 1 },
    version: { type: "string", minLength: 1 },
    base_url: { type: "string", format: "uri", pattern: "^https://" },
    description: { type: "string" },
    modules: {
      type: "array",
      minItems: 1,
      items: { $ref: "#/$defs/module" },
    },
  },
  $defs: {
    module: {
      type: "object",
      additionalProperties: false,
      required: ["module", "operations"],
      properties: {
        module: { type: "string", minLength: 1 },
        operations: {
          type: "array",
          minItems: 1,
          items: { $ref: "#/$defs/operation" },
        },
      },
    },
    operation: {
      type: "object",
      additionalProperties: false,
      required: ["operation_id", "method", "path", "variables"],
      properties: {
        operation_id: { type: "string", minLength: 1 },
        method: { type: "string", enum: API_METHOD_ENUM },
        path: { type: "string", pattern: "^/" },
        variables: {
          type: "array",
          items: { $ref: "#/$defs/variable" },
        },
        request_template: { type: "object", additionalProperties: true, default: {} },
        response_schema: { type: "object", additionalProperties: true, default: {} },
      },
    },
    variable: {
      type: "object",
      additionalProperties: false,
      required: ["name", "type", "required"],
      properties: {
        name: { type: "string", minLength: 1 },
        type: { type: "string", enum: API_VARIABLE_TYPE_ENUM },
        required: { type: "boolean" },
      },
    },
  },
});

export const STATIC_FALLBACK_TEMPLATE = {
  api_name: "my_api",
  version: "1.0.0",
  base_url: "https://api.example.com",
  modules: [
    {
      module: "search",
      operations: [
        {
          operation_id: "search_items",
          method: "GET",
          path: "/search",
          variables: [
            {
              name: "query",
              type: "string",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

const toTrimmedString = (value) => String(value ?? "").trim();
const isPlainObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);

const normalizePath = (value) => {
  const trimmed = toTrimmedString(value);
  if (!trimmed) {
    return "";
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

const buildConstraints = (constraints) => {
  const source = constraints || STATIC_FALLBACK_CONSTRAINTS;
  const allowedMethods = Array.isArray(source.allowed_methods)
    ? source.allowed_methods.map((value) => String(value).toUpperCase())
    : API_METHOD_ENUM;
  const allowedVariableTypes = Array.isArray(source.allowed_variable_types)
    ? source.allowed_variable_types.map((value) => String(value).toLowerCase())
    : API_VARIABLE_TYPE_ENUM;

  return {
    base_url_must_be_https: source.base_url_must_be_https !== false,
    allowed_methods: allowedMethods,
    allowed_variable_types: allowedVariableTypes,
    min_modules: Number(source.min_modules) || 1,
    min_operations_per_module: Number(source.min_operations_per_module) || 1,
    required_top_level_keys: Array.isArray(source.required_top_level_keys)
      ? source.required_top_level_keys
      : ["api_name", "version", "base_url", "modules"],
  };
};

export const normalizeApiDefinitionObject = (input) => {
  if (!isPlainObject(input)) {
    return null;
  }

  const modulesSource = Array.isArray(input.modules) ? input.modules : [];
  const modules = modulesSource
    .filter((mod) => mod && typeof mod === "object" && !Array.isArray(mod))
    .map((mod) => {
      const operationsSource = Array.isArray(mod.operations) ? mod.operations : [];
      const operations = operationsSource
        .filter((op) => op && typeof op === "object" && !Array.isArray(op))
        .map((op) => {
          const variablesSource = Array.isArray(op.variables) ? op.variables : [];
          const variables = variablesSource
            .filter((variable) => variable && typeof variable === "object" && !Array.isArray(variable))
            .map((variable) => ({
              name: toTrimmedString(variable.name),
              type: toTrimmedString(variable.type).toLowerCase(),
              required: typeof variable.required === "boolean" ? variable.required : undefined,
            }));

          return {
            operation_id: toTrimmedString(op.operation_id),
            method: toTrimmedString(op.method).toUpperCase(),
            path: normalizePath(op.path),
            variables,
            ...(isPlainObject(op.request_template)
              ? { request_template: op.request_template }
              : {}),
            ...(isPlainObject(op.response_schema)
              ? { response_schema: op.response_schema }
              : {}),
          };
        });

      return {
        module: toTrimmedString(mod.module ?? mod.module_name),
        operations,
      };
    });

  return {
    api_name: toTrimmedString(input.api_name),
    version: toTrimmedString(input.version),
    base_url: toTrimmedString(input.base_url),
    ...(toTrimmedString(input.description)
      ? { description: toTrimmedString(input.description) }
      : {}),
    modules,
  };
};

const validateObjectKeys = ({ value, allowedKeys, path }) => {
  if (!isPlainObject(value)) {
    return `${path} must be an object.`;
  }

  const invalidKeys = Object.keys(value).filter((key) => !allowedKeys.has(key));
  if (invalidKeys.length > 0) {
    return `${path} has unsupported key(s): ${invalidKeys.join(", ")}.`;
  }

  return null;
};

const validateRawApiDefinitionShape = (rawDefinition) => {
  if (!isPlainObject(rawDefinition)) {
    return "API Definition must be a JSON object.";
  }

  const topLevelAllowed = new Set(["api_name", "version", "base_url", "description", "modules"]);
  const moduleAllowed = new Set(["module", "operations"]);
  const operationAllowed = new Set([
    "operation_id",
    "method",
    "path",
    "variables",
    "request_template",
    "response_schema",
  ]);
  const variableAllowed = new Set(["name", "type", "required"]);

  const topLevelError = validateObjectKeys({
    value: rawDefinition,
    allowedKeys: topLevelAllowed,
    path: "apiDefinition",
  });
  if (topLevelError) {
    return topLevelError;
  }

  const requiredTopLevel = ["api_name", "version", "base_url", "modules"];
  for (const key of requiredTopLevel) {
    if (rawDefinition[key] === undefined || rawDefinition[key] === null || rawDefinition[key] === "") {
      return `API Definition is missing required field: \"${key}\".`;
    }
  }

  if (!Array.isArray(rawDefinition.modules) || rawDefinition.modules.length === 0) {
    return "API Definition must contain at least one module in \"modules\".";
  }

  for (let mi = 0; mi < rawDefinition.modules.length; mi += 1) {
    const moduleValue = rawDefinition.modules[mi];
    const moduleError = validateObjectKeys({
      value: moduleValue,
      allowedKeys: moduleAllowed,
      path: `modules[${mi}]`,
    });
    if (moduleError) {
      return moduleError;
    }

    if (!toTrimmedString(moduleValue.module)) {
      return `modules[${mi}].module is required.`;
    }

    if (!Array.isArray(moduleValue.operations) || moduleValue.operations.length === 0) {
      return `modules[${mi}] must have at least one operation.`;
    }

    for (let oi = 0; oi < moduleValue.operations.length; oi += 1) {
      const operation = moduleValue.operations[oi];
      const operationError = validateObjectKeys({
        value: operation,
        allowedKeys: operationAllowed,
        path: `modules[${mi}].operations[${oi}]`,
      });
      if (operationError) {
        return operationError;
      }

      if (!toTrimmedString(operation.operation_id)) {
        return `modules[${mi}].operations[${oi}].operation_id is required.`;
      }
      if (!toTrimmedString(operation.method)) {
        return `modules[${mi}].operations[${oi}].method is required.`;
      }
      if (!toTrimmedString(operation.path)) {
        return `modules[${mi}].operations[${oi}].path is required.`;
      }
      if (!Array.isArray(operation.variables)) {
        return `modules[${mi}].operations[${oi}].variables must be an array.`;
      }

      if (operation.request_template !== undefined && !isPlainObject(operation.request_template)) {
        return `modules[${mi}].operations[${oi}].request_template must be an object.`;
      }
      if (operation.response_schema !== undefined && !isPlainObject(operation.response_schema)) {
        return `modules[${mi}].operations[${oi}].response_schema must be an object.`;
      }

      for (let vi = 0; vi < operation.variables.length; vi += 1) {
        const variable = operation.variables[vi];
        const variableError = validateObjectKeys({
          value: variable,
          allowedKeys: variableAllowed,
          path: `modules[${mi}].operations[${oi}].variables[${vi}]`,
        });
        if (variableError) {
          return variableError;
        }

        if (!toTrimmedString(variable.name)) {
          return `modules[${mi}].operations[${oi}].variables[${vi}].name is required.`;
        }
        if (!toTrimmedString(variable.type)) {
          return `modules[${mi}].operations[${oi}].variables[${vi}].type is required.`;
        }
        if (typeof variable.required !== "boolean") {
          return `modules[${mi}].operations[${oi}].variables[${vi}].required must be a boolean.`;
        }
      }
    }
  }

  return null;
};

const validateNormalizedApiDefinition = (definition, constraints) => {
  if (!definition || typeof definition !== "object" || Array.isArray(definition)) {
    return "API Definition must be a JSON object.";
  }

  const c = buildConstraints(constraints);
  const requiredTopLevelKeys = c.required_top_level_keys;
  for (const key of requiredTopLevelKeys) {
    const value = definition[key];
    if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
      return `API Definition is missing required field: \"${key}\".`;
    }
  }

  if (c.base_url_must_be_https) {
    let parsed;
    try {
      parsed = new URL(definition.base_url);
    } catch {
      return "API Definition base_url must be a valid absolute URL.";
    }

    if (parsed.protocol !== "https:") {
      return 'API Definition base_url must start with "https://".';
    }
  }

  const modules = definition.modules;
  if (!Array.isArray(modules) || modules.length < c.min_modules) {
    return `API Definition must have at least ${c.min_modules} module(s) in \"modules\".`;
  }

  const moduleNames = new Set();
  const allowedMethods = new Set(c.allowed_methods);
  const allowedVariableTypes = new Set(c.allowed_variable_types);

  for (let mi = 0; mi < modules.length; mi += 1) {
    const moduleValue = modules[mi];
    if (!moduleValue || typeof moduleValue !== "object" || Array.isArray(moduleValue)) {
      return `modules[${mi}] must be an object.`;
    }

    const moduleName = toTrimmedString(moduleValue.module);
    if (!moduleName) {
      return `modules[${mi}].module is required.`;
    }

    if (moduleNames.has(moduleName)) {
      return `Duplicate module name detected: \"${moduleName}\".`;
    }
    moduleNames.add(moduleName);

    const operations = moduleValue.operations;
    if (!Array.isArray(operations) || operations.length < c.min_operations_per_module) {
      return `modules[${mi}] must have at least ${c.min_operations_per_module} operation(s).`;
    }

    const operationIds = new Set();

    for (let oi = 0; oi < operations.length; oi += 1) {
      const operation = operations[oi];
      if (!operation || typeof operation !== "object" || Array.isArray(operation)) {
        return `modules[${mi}].operations[${oi}] must be an object.`;
      }

      const operationId = toTrimmedString(operation.operation_id);
      if (!operationId) {
        return `modules[${mi}].operations[${oi}].operation_id is required.`;
      }
      if (operationIds.has(operationId)) {
        return `Duplicate operation_id \"${operationId}\" found in modules[${mi}].`;
      }
      operationIds.add(operationId);

      const normalizedMethod = toTrimmedString(operation.method).toUpperCase();
      if (!normalizedMethod) {
        return `modules[${mi}].operations[${oi}].method is required.`;
      }
      if (!allowedMethods.has(normalizedMethod)) {
        return `modules[${mi}].operations[${oi}].method \"${operation.method}\" is not allowed. Allowed: ${[...allowedMethods].join(", ")}.`;
      }

      const normalizedPath = normalizePath(operation.path);
      if (!normalizedPath) {
        return `modules[${mi}].operations[${oi}].path is required.`;
      }
      if (!normalizedPath.startsWith("/")) {
        return `modules[${mi}].operations[${oi}].path must start with '/'.`;
      }

      const variables = operation.variables;
      if (!Array.isArray(variables)) {
        return `modules[${mi}].operations[${oi}].variables must be an array.`;
      }

      const variableNames = new Set();
      for (let vi = 0; vi < variables.length; vi += 1) {
        const variable = variables[vi];
        if (!variable || typeof variable !== "object" || Array.isArray(variable)) {
          return `modules[${mi}].operations[${oi}].variables[${vi}] must be an object.`;
        }

        const variableName = toTrimmedString(variable.name);
        if (!variableName) {
          return `modules[${mi}].operations[${oi}].variables[${vi}].name is required.`;
        }
        if (variableNames.has(variableName)) {
          return `Duplicate variable name \"${variableName}\" in modules[${mi}].operations[${oi}].`;
        }
        variableNames.add(variableName);

        const variableType = toTrimmedString(variable.type).toLowerCase();
        if (!variableType) {
          return `modules[${mi}].operations[${oi}].variables[${vi}].type is required.`;
        }
        if (!allowedVariableTypes.has(variableType)) {
          return `modules[${mi}].operations[${oi}].variables[${vi}].type \"${variable.type}\" is not allowed. Allowed: ${[...allowedVariableTypes].join(", ")}.`;
        }

        if (typeof variable.required !== "boolean") {
          return `modules[${mi}].operations[${oi}].variables[${vi}].required must be a boolean.`;
        }
      }
    }
  }

  return null;
};

export const parseNormalizeAndValidateApiDefinition = (jsonText, constraints) => {
  if (!jsonText || !String(jsonText).trim()) {
    return {
      normalized: null,
      error: "API Definition is required.",
    };
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return {
      normalized: null,
      error: "API Definition must be valid JSON.",
    };
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {
      normalized: null,
      error: "API Definition must be a JSON object.",
    };
  }

  const rawShapeError = validateRawApiDefinitionShape(parsed);
  if (rawShapeError) {
    return {
      normalized: null,
      error: rawShapeError,
    };
  }

  const normalized = normalizeApiDefinitionObject(parsed);
  const error = validateNormalizedApiDefinition(normalized, constraints);
  return {
    normalized,
    error: error || null,
  };
};

/**
 * Validates raw API definition JSON text against backend-provided constraints.
 * Returns a string error message, or null if valid.
 */
export const validateApiDefinitionAgainstConstraints = (jsonText, constraints) => {
  const result = parseNormalizeAndValidateApiDefinition(jsonText, constraints);
  return result.error;
};
