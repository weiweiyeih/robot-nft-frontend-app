"use client"

import { useState } from "react";
import { robotNftContractAddress } from "../../constant";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AllRobots from "./AllRobots";
import toast from "react-hot-toast";

function Dashboard() {

    const [robotName, setRobotname] = useState<string>("");

    const { contract } = useContract(robotNftContractAddress);
    const { mutateAsync: createRobot, isLoading } = useContractWrite(contract, "createRobot")

    const createRobotHandler = async () => {
        const notification = toast.loading("Creating your robot...");
        try {
            const data = await createRobot({ args: [robotName] });
            toast.success("Robot created successfully!", { id: notification })
            console.info("contract call successs", data);
            setRobotname("")
        } catch (err) {
            toast.error("Whoops something went wrong!"), {
                id: notification,
            }
            console.error("contract call failure", err);
        }
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 w-full md:space-x-3 md:space-y-0 space-y-3'>
            <div className='p-5 border rounded-lg flex flex-col items-center space-y-3'>
                <h2 className='text-2xl'>Create your Robot</h2>
                <div className='flex flex-row items-center space-x-2'>
                    <Input
                        className='py-1 px-2 font-thin rounded-sm border'
                        type='text'
                        minLength={3}
                        maxLength={15}
                        placeholder='give your robot a name'
                        value={robotName}
                        onChange={(e) => setRobotname(e.target.value)} />
                    <Button className={`border font-semibold rounded-sm py-1 px-2`} onClick={createRobotHandler}
                        disabled={robotName == ""}
                    >Create</Button>
                </div>

            </div>
            <div className='p-5 border rounded-lg col-span-3 '>
                <AllRobots />
            </div>
        </div>
    )
}

export default Dashboard