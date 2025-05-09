import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBoxOpen, 
  FaFileAlt, 
  FaCartPlus, 
  FaCog, 
  FaBars 
} from 'react-icons/fa';
 
import { Link } from "react-router-dom"; 

const AdminSidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2 className={collapsed ? "collapsed" : ""}>IWB</h2>
        <FaBars className="toggle-icon" onClick={toggleSidebar} />
      </div>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-link">
          <FaTachometerAlt className="icon" />
          <span className={collapsed ? "collapsed" : ""}>Dashboard</span>
        </Link>
        
        <Link to="/admin-inventory" className="sidebar-link">
          <FaBoxOpen className="icon" />
          <span className={collapsed ? "collapsed" : ""}>Products</span>
        </Link>
        <Link to="/income-statements" className="sidebar-link">
          <FaFileAlt className="icon" />
          <span className={collapsed ? "collapsed" : ""}>Reports</span>
        </Link>
        <Link to="/dashboard/admin/add-product" className="sidebar-link">
          <FaCartPlus className="icon" />
          <span className={collapsed ? "collapsed" : ""}>Add Products</span>
        </Link>
        <Link to="/settings" className="sidebar-link">
          <FaCog className="icon" />
          <span className={collapsed ? "collapsed" : ""}>Settings</span>
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
