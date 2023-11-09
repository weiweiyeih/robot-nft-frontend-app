
import { robotNftContractAddress } from "../../constant";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import RobotCard from "./RobotCard";

function AllRobots() {
    const address = useAddress();
    const { contract } = useContract(robotNftContractAddress);

    const { data: tokenIds, isLoading: isTokenIdsLoading } = useContractRead(contract, "getAddressToTokenIds", [address]);

    if (!isTokenIdsLoading && tokenIds.length == 0) return (
        <h3 className="flex justify-center text-2xl items-center">You have no robots. Create one!</h3>
    )

    return (
        <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-3 space-y-3">
            {!isTokenIdsLoading && tokenIds.map((tokenId: number) => (

                <RobotCard tokenId={Number(tokenId)} key={Number(tokenId)} />
            ))}
        </div>
    )
}

export default AllRobots