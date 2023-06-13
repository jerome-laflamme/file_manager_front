import CardHeader from '../components/CardHeader';
import { Link } from "react-router-dom";
import '../index.css'


export default function Window1() {
  const links = [
    { href: '/window2', label: 'View and manage my projects' },
  ];

    return (
      <div className='wrapper'>
      <div className='card wide'>
        <CardHeader />
        <h3>Workspace</h3>
        <div className='btn-stack'>
          {links.map(({ href, label }) => (
            <Link key={href} to={href} className='links'>
              {label}
            </Link>
          ))}
        </div>
        <p className='bottom-text'>-Select a directory as a workspace</p>
      </div>
      </div>
    );
  }
