import { Button } from "./ui/button.tsx"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog.tsx"
import { Input } from "../components/ui/input.tsx"
import { Label } from "../components/ui/label.tsx"
import {useState} from "react";
import axios from "axios";



export function DialogAddSong() {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const uploadAudio = async () => {
        console.log('ну сработало')
        try {
            const formDataFile = new FormData()
            formDataFile.append('image', image)
            formDataFile.append("file", file)
            formDataFile.append('name', name)
            formDataFile.append('author', author)
            console.log(formDataFile)
            await axios.post('http://localhost:5000/api/music', formDataFile)
        }
        catch (e) {
            console.log(e)
        }
    }
    const handleDrop = () => {
        console.log('фигня')
        uploadAudio()
        console.log(file)
    }
    const [image, setImage] = useState()

    const [file, setFile] = useState()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-black text-white font-semibold duration-300' variant="outline">Add Song</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black">
                <DialogHeader>
                    <DialogTitle className='text-white'>Add Song</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right text-white">
                            Название
                        </Label>
                        <Input id="name" type='text' className="col-span-3 text-white" onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="author" className="text-right text-white">
                            Автор
                        </Label>
                        <Input id="author" type='text' className="col-span-3 text-white" onChange={e => setAuthor(e.target.value)}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right text-white">
                            Image
                        </Label>
                        <Input id="image" type='file' accept='image/*' className="col-span-3 text-white" onChange={e => setImage(e.target.files[0])}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file" className="text-right text-white">
                            Music
                        </Label>
                        <Input id="file" type='file' accept='.mp3' className="col-span-3 text-white" onChange={e => setFile(e.target.files[0])}/>
                    </div>
                </div>
                <DialogClose asChild>
                    <Button type="submit" onClick={() => handleDrop()}>Отправить</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}
