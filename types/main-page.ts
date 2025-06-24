import { StaticImageData } from 'next/image'
import { IProduct } from './common'

export interface IHeroSlide {
    id?: number
    image: StaticImageData
    title: string
    price?: number
  }
  
  export type IHeroSlideTooltip = IHeroSlide

export interface IMainPageSectionProps{
  title: string,
  goods:IProduct[];
  spinner: boolean
}