
interface ReviewCardProp  {
  word: string;
  number: number;
  name: string;
}
const ReviewCard:React.FC<ReviewCardProp> = ({name,word,number}) => {
  return (
    <div className="font-lato text-black bg-white shadow-2xl border-2 border-gray-200 rounded">
<p>
  {word}

</p>
<div className="flex gap-1 my-2">
  {[...Array(5)].map((__,index) =>(
    <i  key={index} className={`fas fa-star  ${index < number? 'text-yellow-500': "text-black"}`}/> 
  ))}

</div>
  <div className="w-full h-full flex items-end justify-center">
    <div className="bg-amber-500 rounded-full p-3">{name.charAt(0)}</div>
    <p>{name}</p>
    </div>    
    </div>
  )
}

export default ReviewCard
