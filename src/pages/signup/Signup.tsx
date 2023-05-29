import { ChangeEvent, FormEvent, useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
// styles
import './Signup.css'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [thumbnailError, setThumbnailError] = useState('')
    const {signup, isPending, error} = useSignup()


    const handleFileChange = (e: ChangeEvent) => {
        setThumbnail(null)
        const target = e.target as HTMLInputElement
        let selected = (target.files as FileList)[0]

        if(!selected) {
            setThumbnailError('Please select a file')
            return
        }
        if(!selected.type.includes('image')) {
            setThumbnailError('Selected file must be an image')
            return
        }
        if(selected.size > 100000) {
            setThumbnailError('Image file size must be less then 100kb')
            return
        }

        setThumbnailError('')
        setThumbnail(selected)

    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        signup(email, password, displayName, thumbnail!)
    }


    return (
        <form 
            className='auth-form'
            onSubmit={handleSubmit}
        >
            <h2>Sign up</h2>
            <label>
                <span>email:</span>
                <input 
                    required 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input 
                    required 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>display name:</span>
                <input 
                    required 
                    type="text" 
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>profile thumbnail:</span>
                <input 
                    required 
                    type="file" 
                    onChange={handleFileChange}
                />
                {thumbnailError && <div className='error'>{thumbnailError}</div>}
            </label>
            {
                !isPending
                ? <button className="btn">
                    Sign up
                </button>
                : <button className="btn" disabled>
                    loading
                </button>
            }
            {
                error &&
                <div className='error'>
                    {error}
                </div>
            }
        </form>
    )
}