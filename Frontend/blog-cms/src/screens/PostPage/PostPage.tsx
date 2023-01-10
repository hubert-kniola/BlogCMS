import React from "react";
import {
  BackgroundDiv,
  BestThree,
  Gallery,
  MainPageMenu,
} from "../../components";
import { ClockIco } from "../../components/Ico";
import { BEM } from "../../tools";
import { Post } from "../../types";
import "./style.css";

const person =
  "https://www.bentbusinessmarketing.com/wp-content/uploads/2013/02/35844588650_3ebd4096b1_b-1024x683.jpg";
const img =
  "https://pix10.agoda.net/hotelImages/951189/-1/a3ab86fcd2d8942c27e40e8fc5601663.jpg?ca=9&ce=1&s=1024x768";
export const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
export const url1 =
  "https://previews.123rf.com/images/datsenkomarina/datsenkomarina1801/datsenkomarina180100123/93153161-beautiful-view-of-the-tropical-beach-of-sri-lanka-on-a-sunny-day.jpg";
export const url2 =
  "https://res.klook.com/image/upload/c_fill,w_1160,h_460,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/51988759-Sarangkot-Sunrise-View.webp";
const posts: Post[] = [
  {
    title: "Post 2",
    publicationDate: "25/10/2022",
    content: lorem,
    primaryImgName: url1,
    snippet:
      "To jest tekst o określonej długości, krótki, mówiący co jest 5. Generalnie zawiera krótki opis tekstu, który ma zachęcić czytelnika.",
  },
  {
    title: "Post 1",
    publicationDate: "26/10/2022",
    content: lorem,
    primaryImgName: url2,
    snippet:
      "To jest tekst o określonej długości, krótki, mówiący co jest 5. Generalnie zawiera krótki opis tekstu, który ma zachęcić czytelnika.",
  },
  {
    title: "Post 3",
    publicationDate: "27/10/2022",
    content: lorem,
    primaryImgName: url1,
    snippet:
      "To jest tekst o określonej długości, krótki, mówiący co jest 5. Generalnie zawiera krótki opis tekstu, który ma zachęcić czytelnika.",
  },
  {
    title: "Post 4",
    publicationDate: "28/10/2022",
    content: lorem,
    primaryImgName: url2,
    snippet: "",
  },
  {
    title: "Post 5",
    publicationDate: "29/10/2022",
    content: lorem,
    primaryImgName: url1,
    snippet: "",
  },
  {
    title: "Post 6",
    publicationDate: "29/10/2022",
    content: lorem,
    primaryImgName: url1,
    snippet: "",
  },
  {
    title: "Post 7",
    publicationDate: "29/10/2022",
    content: lorem,
    primaryImgName: url1,
    snippet: "",
  },
];

const css = {
  postPage: "postPage",
  container: "container",
  title: "title",
  author: "author",
  picture: "picture",
  name: "name",
  date: "date",
  time: "time",
  content: "content",
};

export const PostPage = () => {
  return (
    <>
      <MainPageMenu />
      <div className={BEM(css.postPage, css.container)}>
        <div className={BEM(css.postPage, css.title)}>
          <br />
          <h1>
            To jest tytuł pierwszego wpisu - ale nie wiem jak ma się nazywać, ma
            być długi. Tak żeby zajmował dwie linie
          </h1>
          <p>
            Tutaj będzie jakiś snippet bla bla bla - opis postu co? jak? gdzie?
            po co? dlaczego? co to ma na celu? Czy to ma sens?
          </p>
        </div>
        <div className={BEM(css.postPage, css.author)}>
          <BackgroundDiv
            url={person}
            className={BEM(css.postPage, css.author, css.picture)}
          />
          <div className={BEM(css.postPage, css.author, css.name)}>
            Mateusz Kuźniak
          </div>
          <div className={BEM(css.postPage, css.author, css.date)}>
            02.12.2022
          </div>
          <div className={BEM(css.postPage, css.author, css.time)}>
            <ClockIco />
            <p>5 min</p>
          </div>
        </div>
        <BackgroundDiv url={img} className={BEM(css.postPage, css.picture)} />
        <div className={BEM(css.postPage, css.content)}>
          <Content />
        </div>
        <Gallery />
        <br />
      </div>
      <BestThree />
    </>
  );
};

const Content = () => {
  return (
    <>
      <h3 className="TESTDATA">
        The standard Lorem Ipsum passage, used since the 1500s
      </h3>
      <p className="TESTDATA1">
        &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.&quot;
      </p>
      <h3 className="TESTDATA2">
        Section 1.10.32 of &quot;de Finibus Bonorum et Malorum&quot;, written by
        Cicero in 45 BC
      </h3>
      <p className="TESTDATA3">
        &quot;Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?&quot;
      </p>
      <h3 className="TESTDATA4">1914 translation by H. Rackham</h3>
      <p className="TESTDATA5">
        &quot;But I must explain to you how all this mistaken idea of denouncing
        pleasure and praising pain was born and I will give you a complete
        account of the system, and expound the actual teachings of the great
        explorer of the truth, the master-builder of human happiness. No one
        rejects, dislikes, or avoids pleasure itself, because it is pleasure,
        but because those who do not know how to pursue pleasure rationally
        encounter consequences that are extremely painful. Nor again is there
        anyone who loves or pursues or desires to obtain pain of itself, because
        it is pain, but because occasionally circumstances occur in which toil
        and pain can procure him some great pleasure. To take a trivial example,
        which of us ever undertakes laborious physical exercise, except to
        obtain some advantage from it? But who has any right to find fault with
        a man who chooses to enjoy a pleasure that has no annoying consequences,
        or one who avoids a pain that produces no resultant pleasure?&quot;
      </p>
      <h3 className="TESTDATA6">
        Section 1.10.33 of &quot;de Finibus Bonorum et Malorum&quot;, written by
        Cicero in 45 BC
      </h3>
      <p className="TESTDATA7">
        &quot;At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati cupiditate non provident,
        similique sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
        distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
        cumque nihil impedit quo minus id quod maxime placeat facere possimus,
        omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem
        quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
        ut et voluptates repudiandae sint et molestiae non recusandae. Itaque
        earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
        voluptatibus maiores alias consequatur aut perferendis doloribus
        asperiores repellat.&quot;
      </p>
      <h3 className="TESTDATA8">1914 translation by H. Rackham</h3>
      <p className="TESTDATA9">
        &quot;On the other hand, we denounce with righteous indignation and
        dislike men who are so beguiled and demoralized by the charms of
        pleasure of the moment, so blinded by desire, that they cannot foresee
        the pain and trouble that are bound to ensue; and equal blame belongs to
        those who fail in their duty through weakness of will, which is the same
        as saying through shrinking from toil and pain. These cases are
        perfectly simple and easy to distinguish. In a free hour, when our power
        of choice is untrammelled and when nothing prevents our being able to do
        what we like best, every pleasure is to be welcomed and every pain
        avoided. But in certain circumstances and owing to the claims of duty or
        the obligations of business it will frequently occur that pleasures have
        to be repudiated and annoyances accepted. The wise man therefore always
        holds in these matters to this principle of selection: he rejects
        pleasures to secure other greater pleasures, or else he endures pains to
        avoid worse pains.&quot;
      </p>
    </>
  );
};
