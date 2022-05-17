import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';

const CategoryIcon = ({ categoryId }) => {
  const renderIcon = () => {
    switch ( categoryId ){
      case "electronics":
        return <TvOutlinedIcon color="primary" />;
      case "real-estate":
        return <HomeOutlinedIcon color="primary" />;
      case "fashion":
        return <CheckroomOutlinedIcon color="primary" />;
      case "vehicles":
        return <TimeToLeaveOutlinedIcon color="primary" />;
      case "phones-and-tablets":
        return <PhoneAndroidOutlinedIcon color="primary" />;
      case "furniture":
        return <ChairOutlinedIcon color="primary" />;
      case "health-and-beauty":
        return <HealthAndSafetyOutlinedIcon color="primary" />;
      case "sports-and-outdoors":
        return <SportsSoccerOutlinedIcon color="primary" />;
      case "services":
        return <HomeRepairServiceOutlinedIcon color="primary" />;
      case "jobs":
        return <WorkOutlineOutlinedIcon color="primary" />;
      case "babies-and-kids":
        return <ChildCareOutlinedIcon color="primary" />;
      case "animals-and-pets":
        return <PetsOutlinedIcon color="primary" />;
      case "agriculture-and-food":
        return <RestaurantOutlinedIcon color="primary" />;
      case "equipment-and-tools":
        return <BuildOutlinedIcon color="primary" />;
      case "repair-and-construction":
        return <ConstructionOutlinedIcon color="primary" />;
      default:
        return <InterestsOutlinedIcon color="primary" />;
    }
  }

  return(
    <>{renderIcon()}</>
  )
}

export default CategoryIcon;