// style
import './Avatar.css'

export default function Avatar({src}: {src: string}) {
    return (
        <div className='avatar'>
            <img src={src} alt="user avatar" />
        </div>
    )
}
