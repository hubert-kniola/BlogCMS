export type Post = {
    title: string,
    date: string,
    content: string,
    imgUrl: string,
}

export type MenuItemType = {
    title: string;
    url: string
    subMenu?: MenuItemType[]
}

