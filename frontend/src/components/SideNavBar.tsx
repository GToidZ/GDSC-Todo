import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import ActivitySelection from './ActivitySelection';
import { useContext } from 'react';
import ModificationStoresContext from '../stores/ModificationStores';
interface props {
  showNavbar: boolean
}

const SideNavBar = ({ showNavbar }: props) => {
  const modification = useContext(ModificationStoresContext)

  return (
    <div className="bg-white" style={{ width: (showNavbar ? "25vh" : "") }}>
      <div className="bg-[#F4F4F4] rounded-lg p-3">
        <div>
          <p className={`text-2xl font-bold`}>{showNavbar ? "Menu" : " "}</p>
        </div>
        <div>
          <button className={`bg-[#E44F44] w-full rounded-lg text-white p-1 ${showNavbar ? 'mt-2' : 'p-3'}`}
            onClick={() => { modification.changeOpenState(true) }}>{showNavbar ? '+ Add todo' : '+'}</button>
        </div>
        <div className="grid gap-2 mt-2">
          <ActivitySelection icon={<FormatListBulletedIcon />} name="Active list" minimized={!showNavbar} />
          <ActivitySelection icon={<StarOutlineIcon />} name="Important" minimized={!showNavbar} />
          <ActivitySelection icon={<DomainVerificationIcon />} name="Completed" minimized={!showNavbar} />
        </div>
      </div>
    </div>
  )
}

export default SideNavBar