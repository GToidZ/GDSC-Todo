import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { todoModel, API_LINK } from '../models/todo';
import { useContext, useRef, useState, } from 'react';
import ModificationStoresContext from '../stores/ModificationStores';
import CancelIcon from '@mui/icons-material/Cancel';
import { observer } from 'mobx-react';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
interface props {
  todo: todoModel | undefined
  showDetail: Function
}

const ActivityDetail = observer(({ todo, showDetail }: props) => {
  const description = useRef<HTMLTextAreaElement | null>(null);
  const name = useRef<HTMLInputElement | null>(null);
  const modification = useContext(ModificationStoresContext)
  const [filled, setFilled] = useState<boolean>(todo!.favorited)

  function deleteHandler() {
    try {
      axios({
        method: 'delete',
        url: `${API_LINK}/todo/delete/${todo!.entityId}`,
      })
      modification.changeOpenState(false)
    } catch {
      alert(`Error delete Todo !!!.`)
    }
  }

  function saveHandler(job: string) {
    const data = {
      name: name.current?.value,
      description: description.current?.value,
      done: (job === "update" ? todo!.done : job === "create" ? false : true),
      favorited: filled
    }

    console.log(data)

    try {
      axios({
        method: (job === "create" ? "post" : "put"),
        url: (job === "create" ? `${API_LINK}/todo/create` : `${API_LINK}/todo/edit/${todo!.entityId}`),
        data: data
      })
    } catch {
      alert(`Error can't ${job} ${name.current}Todo!!!.`)
    }
  }

  return (
    <div className="p-3 w-ful h-full bg-[#F4F4F4] rounded-lg relative">
      <div className='absolute top-1 right-1 cursor-pointer' onClick={() => { showDetail() }}>
        <CloseIcon style={{ fontSize: 20 }} />
      </div>
      <div className="text-4xl w-full grid grid-cols-[80%,20%] mt-4">
        <div>
          <input type="text" className="outline-none bg-[#F4F4F4]" ref={name} defaultValue={modification.open ? "New todo" : todo!.name} />
        </div>
        <div className='flex items-center justify-center mt-[0.05rem]' onClick={() => { setFilled(preFill => !preFill); }}>
          {filled ? <StarIcon style={{ fill: '#F9BB07' }} /> : <StarBorderIcon />}
        </div>
      </div>
      <hr className="border-2 mt-4 mb-4" />
      <div className='relative '>
        <p>Description</p>
        <textarea defaultValue={todo!.description} ref={description} className="outline-none rounded-lg w-full h-[30vh] p-3 mt-3" />
        <div className={`absolute h-[110%] w-full grid ${modification.open ? 'grid-cols-2' : 'grid-cols-3'} p-3 gap-2 items-end justify-center`}>
          {modification.open ?
            <>
              <button className="rounded-md buttom-0 justify-center items-center h-[3rem]" onClick={() => { modification.changeOpenState(false) }}>
                <CancelIcon />
                <p>Cancel</p>
              </button>
              <button className="rounded-md justify-center items-center h-[3rem]" onClick={() => { saveHandler('create') }}>
                <SaveIcon />
                <p>save</p>
              </button>
            </>
            :
            <>
              <button className="rounded-md buttom-0 justify-center items-center h-[3rem]" onClick={() => { saveHandler('done') }}>
                <CheckIcon />
                <p>Completed</p>
              </button>
              <button className="rounded-md justify-center items-center h-[3rem]" onClick={deleteHandler}>
                <DeleteIcon />
                <p>Delete</p>
              </button>
              <button className="rounded-md justify-center items-center h-[3rem]" onClick={() => { saveHandler('update') }}>
                <SaveIcon />
                <p>save</p>
              </button>
            </>
          }
        </div>
      </div>
    </div>
  )
})

export default ActivityDetail