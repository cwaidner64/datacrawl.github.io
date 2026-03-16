import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer >
           <div className="relative py-10 text-[#E3E3E3] bg-[#111111] w-full overflow-clip px-4 sm:px-6 md:px-10 xl:px-35 flex flex-col box-border">

                <img src="/landing/bg3.svg" className="absolute left-0 bottom-0 pointer-events-none z-100 h-full w-full object-cover " />

                <div className="flex flex-col w-full h-full">

                    <div className=" relative w-full py-10 flex flex-col md:flex-row text-[#E3E3E3] bg-[#111111] overflow-x-hidden gap-10 md:gap-0">

                        <div className="flex flex-col gap-2 mb-4 md:mb-[100px]">
                            <span className="flex items-center gap-4 xl:px-2">
                                <img src="/landing/Logo.svg" className="w-12" />
                                <p className="text-[20px] ">DataCrawl</p>
                            </span>
                            <p className="text-[#928F8F] mt-8 text-s xl:px-2">Data has never been easier</p>
                            <div className="flex flex-row h-[30px] mt-6 sm:mt-10 justify-start gap-2">
                                <img src="/landing/Instagram.svg" className="hover:cursor-pointer hover:scale-[1.05] hover:text-[#b6b1b1] duration-500" />
                                <img src="/landing/GitHub.svg" className="hover:cursor-pointer hover:scale-[1.05] hover:text-[#b6b1b1] duration-500" />
                                <img src="/landing/Facebook.svg" className="hover:cursor-pointer hover:scale-[1.05] hover:text-[#b6b1b1] duration-500" />
                                <img src="/landing/X.svg" className="hover:cursor-pointer hover:scale-[1.05] hover:text-[#b6b1b1] duration-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:flex md:flex-row md:gap-20 md:justify-evenly md:ml-100 mb-6 md:mb-25">
                            <div className="flex flex-col font-[Heebo]">
                                <p className="font-bold text-s mb-[35px]">Products</p>
                                <p className="text-[#928F8F] text-s mb-[25px] hover:cursor-pointer hover:scale-[1.05] hover:text-[#b6b1b1] duration-500" onClick={() => navigate('/market')}>DataMarket</p>
                                <p className="text-[#928F8F] text-s mb-[25px] hover:cursor-pointer hover:scale-[1.05] hover:text-[#b6b1b1] duration-500" onClick={() => navigate('/ai-node-training')}>AI Node Training</p>
                            </div>

                            <div className="flex flex-col font-[Heebo]">
                                <p className="font-bold text-s mb-[35px]">Company</p>
                                <p className="text-[#928F8F] text-s mb-[25px] hover:cursor-pointer hover:scale-[1.05] hover:text-[#b6b1b1] duration-500" onClick={() => navigate('/about')}>About</p>
                                <p className="text-[#928F8F] text-s mb-[25px] hover:cursor-pointer hover:scale-[1.05] hover:text-[#b6b1b1] duration-500" onClick={() => navigate('/investors')}>Investors</p>
                                <p className="text-[#928F8F] text-s mb-[25px] hover:cursor-pointer hover:scale-[1.05] hover:text-[#b6b1b1] duration-500" onClick={() => navigate('/contact')}>Contact</p>
                            </div>

                
                        </div>

                    </div>
                </div>

                <p className="text-[#AFAFAF] mb-2 md:-mr-20 font-[Heebo] self-start md:self-end text-sm">© 2026 DataCrawl LLC</p>

            </div>
    </footer>
  );
}

export default Footer;