import propTypes from "prop-types";
import {Link} from 'react-router-dom';

export default function Home(props) {
    return (
        <Link to="/"><button type="button" className="close-seach" onClick={props.resetSearch}></button></Link>
    );
}