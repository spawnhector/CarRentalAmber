import NewlineText from 'src/components/text/newLine';

export default function DetailTab({addonData}){
    // console.log(addonData)
    return <div>
        <div>
            <NewlineText text={addonData.details}/>
        </div>
    </div>
}