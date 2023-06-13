import '../index.css';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function Window3() {

  const projectName = window.location.pathname.split('/')[1];

  const navigate = useNavigate();
  const goBack = () => {
    console.log('go back');
    navigate('/window2');
  }
  return (
    <>
      <div className='wrapper'>
        <div className='card window-3'>
          <div className="left">
            <div className="back-section" onClick={goBack}>
              <AiOutlineArrowLeft className="arrow" /> Back
            </div>
          </div>
          <div className="inline">
            <h3>Project: </h3>
            <p>{projectName}</p>
          </div>

        </div>
      </div>

    </>
  );
}