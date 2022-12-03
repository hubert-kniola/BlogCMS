import React from "react"
import { Input, MainPageMenu } from "../../components"
import { BEM } from "../../tools"
import "./style.css"

const css = {
  contact: "contact",
  view: "view",
  box: "box",
  info: "info",
  form: "form",
  content: "content"
}

export const ContactPage = () => {
    return (
      <>
        <MainPageMenu />
        <div className={BEM(css.contact, css.view)}>
          <div className={BEM(css.contact, css.box)}>
            <div className={BEM(css.contact, css.info)}>
              <p> Chcesz się skontaktować? </p>
              <div>
                Podziel się Twoimi doświadczeniami! Powiedz co Cię inspiruje. A
                może chcesz uzyskać wiecej informacji odnośnie jakiegoś postu?
              </div>
              <TextBox option="Mail" contact="mail@mail.com" />
              <TextBox option="Telefon" contact="+48 123 456 789" />
              <TextBox
                option="Instagram"
                contact="www.instagram.com/instagram"
              />
            </div>
            <div className={BEM(css.contact, css.form)}>
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
      <div className={BEM(css.contact, css.content)}>
        <h1> {option} </h1>
        <div>{contact}</div>
      </div>
    );
}

