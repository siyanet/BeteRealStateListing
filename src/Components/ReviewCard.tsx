
interface ReviewCardProp  {
  word: string;
  number: number;
  name: string;
}
const ReviewCard:React.FC<ReviewCardProp> = ({name,word,number}) => {
  return (
    <div className="font-lato p-4 text-black shadow border-2 border-gray-200 bg-white rounded">
  <p className="text-lg">{word}</p>

  <div className="flex gap-1 py-2">
    {[...Array(5)].map((__, index) => (
      <i
        key={index}
        className={`fas fa-star ${index < number ? 'text-yellow-500' : 'text-black'}`}
      />
    ))}
  </div>

  <div className="w-full flex items-center justify-end gap-2 mt-2">
    <div className="bg-amber-500 rounded-full w-8 h-8 flex items-center justify-center font-bold text-white">
      {name.charAt(0)}
    </div>
    <p className=" text-lg font-semibold">{name}</p>
  </div>
</div>


  )
}

export default ReviewCard


{/* <div className="font-lato bg-red-700 p-4 text-black  shadow-2xl border-2 border-gray-200 rounded">
<p>
  {word}

</p>
<div className="flex gap-1 py-2">
  {[...Array(5)].map((__,index) =>(
    <i  key={index} className={`fas fa-star  ${index < number? 'text-yellow-500': "text-black"}`}/> 
  ))}

</div>
  <div className="w-full h-full flex items-center justify-end ">
    <div className="bg-amber-500  rounded-full w-8 h-8 flex justify-center items-center font-bold font-lato ">{name.charAt(0)}</div>
    <p>{name}</p>
    </div>    
    </div> */}