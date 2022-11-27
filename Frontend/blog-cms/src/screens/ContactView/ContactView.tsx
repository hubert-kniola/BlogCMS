import React from "react"
import { Input, MainPageMenu } from "../../components"
import "./style.css"

export const ContactView = () => {
    return (
      <>
        <MainPageMenu />
        <div className="contact_view">
          <div className="contact_box">
            <div className="contact_info">
              <p> Chcesz się skontaktować? </p>
              <div>
                Podziel się Twoimi doświadczeniami! Powiedz co Cię inspiruje, a
                może chcesz uzyskać wiecej informacji odnośnie jakiegoś postu?
              </div>
              <TextBox option="Mail" contact="mail@mail.com" />
              <TextBox option="Telefon" contact="+48 123 456 789" />
              <TextBox
                option="Instagram"
                contact="www.instagram.com/instagram"
              />
            </div>
            <div className="contact_form">
              <p>Formularz kontaktowy </p>
              <h1> Imię: </h1>
              <Input placeholder="Imię"/>
              <h1> E-mail: </h1>
              <Input placeholder="E-mail"/>
              <h1>Co tam?</h1>
              <textarea required placeholder="Co tam? "/>
              <button type="submit" >Wyślij!</button>
            </div>
          </div>
        </div>
      </>
    );
}

interface ITextBox {
    option: string;
    contact: string;
}


const TextBox = ({option, contact} : ITextBox) => {
    return (
      <div className="contact_content">
        <h1> {option} </h1>
        <div>{contact}</div>
      </div>
    );
}
