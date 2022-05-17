import { Popconfirm } from 'antd';

function confirm(e) {
//   console.log(e);
//   message.success('Click on Yes');
}

function cancel(e) {
//   console.log(e);
//   message.error('Click on No');
}

function handleDeleteClick(index,setAttachedAddon,subOwner) {
    setAttachedAddon(prev=>{
        [...prev.map((val)=>{
            if(val.title === subOwner){
                if(val.subAddon){
                  const newArr = val.subAddon.filter((subs,subindex)=>{
                      return subindex !==  index;
                  })
                  val.subAddon = newArr;
                }
                if(val.sub_addons){
                  const newArr = val.sub_addons.filter((subs,subindex)=>{
                      return subindex !==  index;
                  })
                  val.sub_addons = newArr;
                }
            }
        })]
        return [...prev]
    })
}
export default function SubDeleteConfirm({key,index,setAttachedAddon,subOwner}){
    return (
  <Popconfirm
    title="Are you sure to delete this attached addon?"
    onConfirm={()=>handleDeleteClick(index,setAttachedAddon,subOwner)}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <a key={key} href="#">remove</a>
  </Popconfirm>
)};