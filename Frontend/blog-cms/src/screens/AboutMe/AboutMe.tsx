import React from "react"
import { MainPageMenu } from "../../components"
import "./style.css"

const img = 'https://www.bentbusinessmarketing.com/wp-content/uploads/2013/02/35844588650_3ebd4096b1_b-1024x683.jpg'

export const AboutMe = () => {
    
    return <>
        <MainPageMenu/>
        <div className="aboutMe">
            <div 
                className="aboutMe_photo"
                style={{ backgroundImage: `url(${img})` }}>

            </div>
            <div className="aboutMe_content">
                <p>Poznajmy się!</p>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor eleifend elit vel fermentum. In at lorem commodo sem aliquam ultricies. Curabitur hendrerit aliquet ligula vitae dignissim. Aliquam lobortis molestie metus, nec sagittis elit iaculis sed. Aenean arcu odio, mattis vitae tincidunt eget, placerat sed massa. Nullam luctus nulla sit amet leo bibendum, vitae auctor elit pellentesque. Vestibulum luctus, ipsum congue semper consectetur, velit tellus luctus enim, maximus molestie mauris diam vel odio. Morbi sodales, mi sed eleifend venenatis, lacus felis pharetra ipsum, ac lobortis libero libero in lectus.</div>
            </div>
        </div>
    </>
}