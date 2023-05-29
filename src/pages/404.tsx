import React from 'react';
import homeStyles from '../App.module.scss'
import { Link } from 'react-router-dom';

const PageNotFound: React.FC = () => {
    return (
        <div className={homeStyles.pageNotFound}>
            <h1>Page Not Found</h1>
             <Link to='/'><button className={homeStyles.button}><span className={homeStyles.span_btn}>Go to Homepage</span></button></Link>
        </div>
    );
};

export default PageNotFound;