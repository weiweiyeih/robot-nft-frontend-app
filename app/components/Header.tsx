import { ModeToggle } from './ModeToggle'
import { ConnectWallet } from "@thirdweb-dev/react";

function Header() {
    return (
        <div className='flex flex-col space-y-6 md:flex-row justify-between items-center w-full p-5 border rounded-lg'>
            <div className='flex flex-row items-center space-x-2'>
                <h1 className='text-5xl font-bold'>RobotNFT</h1>
                <div className=''>
                    <ModeToggle />
                </div>
            </div>
            <div className='md:pb-6'>
                <ConnectWallet />
            </div>
        </div>
    )
}

export default Header