import React, { FormEvent, useState } from "react"
import axios from 'axios'

export const SendFiles = () => {
    const [images, setImages] = useState({} as FileList)

    const submitHandler = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();

        for (let i = 0 ; i < images.length ; i++) {
            formData.append("images", images[i]);
        }

        console.log(images);

        axios
        .post("http://localhost:7011/api/FileUpload", formData)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    }

    //Dodać limit wielkości np. Max 10 MB dla pliku 
    //Dodać ilośc plików np. Max 10 plików
    //Razem na daje 10*10 = 100 MB

    return (
      <>
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            type="file"
            name="images"
            multiple
            onChange={(e) => setImages(e.target.files)}
            accept="image/png, image/jpeg, image/jpg"
          />
          <input type="submit" value="Send" />
        </form>
      </>
    );
}