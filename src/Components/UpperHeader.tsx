

const UpperHeader:React.FC = () => {
  return (
    <div className="bg-yellow-500 text-black text-sm md:text-lg">
        <div className="flex justify-between p-2">
            <div className="flex gap-2">
                <p><i className="fas fa-phone"/>251934543456</p>
                <p><i className="fas fa-envelope"/>Bete@example.com</p>
                <p><i className="fas fa-map-maker-alt"/>AddisAbaba,Megenagna</p>
            </div>
            <div className="flex gap-4">
                <i className="fas fa-facebook"/>
                <i className="fas fa-instagram"/>
                <i className="fas fa-linkedin"/>
                <i className="fas fa-twitter"/>
            </div>
        </div>
      
    </div>
  )
}

export default UpperHeader;
