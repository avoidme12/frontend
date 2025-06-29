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
import {useToast} from "@/hooks/use-toast.js";


export function DialogEditSong(item) {

    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState()
    const [file, setFile] = useState()
    const { toast } = useToast()

    const editAudio = async () => {
        let filePath = ''
        let imagePath = ''
        let idFile = ''
        let idImage = ''

        const formDataFile = new FormData()
        formDataFile.append('file', file)
        formDataFile.append('upload_preset', 'music-app')
        formDataFile.append('cloud_name', 'dehzfto8m')
        const formDataImage = new FormData()
        formDataImage.append('file', image)
        formDataImage.append('upload_preset', 'music-app')
        formDataImage.append('cloud_name', 'dehzfto8m')
        console.log(formDataFile)

        console.log('ну сработало')
        try {
            toast({
                title: 'Начался процесс замены!',
                description: 'Пожалуйста, не обновляйте страницу!'
            })
            try {
                await axios.post(`${import.meta.env.VITE_HOST}/delete/data`, {
                    image: item.item.publicIdImage,
                    file: item.item.publicIdFile,
                }).then(r => {
                    toast({
                        title: 'Старые данные успешно удалены!'
                    })
                    console.log(r)
                })

                const response = await fetch(`https://api.cloudinary.com/v1_1/dehzfto8m/image/upload`, {
                    method: "POST",
                    body: formDataImage
                }).then(res => {
                    toast({
                        title: 'Отправка нового изображения на сервер успешно завершена!'
                    })
                    return res.json()
                })
                idImage = response.public_id
                imagePath = response.url
                console.log(response)

                const response1 = await fetch(`https://api.cloudinary.com/v1_1/dehzfto8m/video/upload`, {
                    method: "POST",
                    body: formDataFile
                }).then(res => {
                    toast({
                        title: 'Отправка новой музыки на сервер успешно завершена!'
                    })
                    return res.json()
                })
                idFile = response1.public_id
                filePath = response1.url
                console.log(response1)

                try {

                    await axios.put(`${import.meta.env.VITE_HOST}/edit/${item.item.id}`, {
                        name: name,
                        desc: author,
                        image: imagePath,
                        file: filePath,
                        publicIdImage: idImage,
                        publicIdFile: idFile
                    }).then(r => {
                        console.log(r)
                        if(r.status === 200 || r.status === 201){
                            toast({
                                title: 'Успешно редактировано!',
                                description: 'Можно обновить страницу'
                            })
                        }
                    })
                } catch (e) {
                    console.log(e)
                    return 'Error!'
                }
            } catch (e) {
                console.log(e)
                toast({
                    title: 'Непредвиденная ошибка!',
                    description: 'Повторите попытку позже!'
                })
            }
        }
        catch (e) {
            console.log(e)
            toast({
                title: 'Непредвиденная ошибка!',
                description: 'Повторите попытку позже!'
            })
        }
    }
    const handleDrop = () => {
        editAudio()
        console.log(file)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-black text-white font-semibold duration-300' variant="outline">Edit Song</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black">
                <DialogHeader>
                    <DialogTitle className='text-white'>Edit Song</DialogTitle>
                    <DialogDescription>
                        Edit song in app
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
