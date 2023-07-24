import Link from "next/link"
import Image from "next/image"

export default function CardAnime({ data }) {
  return (
    <Link className="transition duration-500 ease-in-out hover:scale-105" href={`/anime/${data.mal_id}`}>
      <Image className="max-w-[12.5rem] h-72 mb-5 rounded-2xl shadow-[0px_0px_15px_1px_rgb(0,0,0)]" 
        src={data.images.jpg.large_image_url} 
        alt={`Imagem do anime ${data.title}`} 
        width={1920}
        height={1080}
        priority
      />
      <p className="max-w-[12.5rem] min-h-[5.75rem] text-white text-center text-lg">{data.title}</p>
    </Link>
  )
}