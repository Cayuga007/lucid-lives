import { Link } from 'react-router-dom'

export function Root() {
    return (
        <>
            <label>Root</label>
            <Link to="/Section3">Section 3</Link>
            <Link to="/Section1">Section 1</Link>
        </>
    )
}