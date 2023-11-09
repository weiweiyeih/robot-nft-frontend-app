import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { robotNftContractAddress } from "../../constant";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import toast from "react-hot-toast";


type NFTCardProps = {
    tokenId: number;
};

function RobotCard({ tokenId }: NFTCardProps) {
    const { contract } = useContract(robotNftContractAddress);

    const { data: robotName, isLoading: isRobotNameLoading } = useContractRead(contract, "getRobotName", [tokenId]);
    const { data: robotExp, isLoading: isRobotExpLoading } = useContractRead(contract, "getRobotExp", [tokenId]);
    const { data: robotLv, isLoading: isRobotLvLoading } = useContractRead(contract, "getRobotLv", [tokenId]);
    const { data: robotImage, isLoading: isRobotImageLoading } = useContractRead(contract, "getRobotImage", [tokenId]);

    const { mutateAsync: trainRobot, isLoading: isTrainRobotLoading } = useContractWrite(contract, "trainRobot")

    const trainRobotHandler = async () => {
        const notification = toast.loading("Training the robot...");
        try {
            const data = await trainRobot({ args: [tokenId] });
            toast.success("Robot trained successfully!", { id: notification })
            console.info("contract call successs", data);
        } catch (err) {
            toast.error("Whoops something went wrong!"), {
                id: notification,
            }
            console.error("contract call failure", err);
        }
    }

    return (
        <div className='p-5 border rounded-lg flex flex-col items-center space-y-2'>
            <Image src={robotImage} width={250} height={250} alt='' className='rounded-sm' />
            <div className='flex flex-row space-x-3 items-center'>
                <p className='font-semibold'>{robotName}</p>
                <p>Lv: {Number(robotLv)}</p>
                <p>Exp: {Number(robotExp)}</p>
                <Button className='py-0 px-4 font-bold rounded-lg' onClick={trainRobotHandler}
                    disabled={Number(robotLv) == 3 && Number(robotExp) == 100}
                >{(Number(robotLv) == 3 && Number(robotExp) == 100) ? "max Lv" : "Train"}</Button>
            </div>
        </div>
    )
}

export default RobotCard