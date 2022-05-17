import NewlineText from 'src/components/text/newLine';

export default function DetailTab({vehicleData}){
    return <div>
        <div>
            <NewlineText text={vehicleData.detail}/>
        </div>
        <div>
            <NewlineText text={vehicleData.subDetail}/>
        </div>
    </div>
}