interface Props {
  likes: number
}

const PersonsLiked = (props: Props) => {
  return (
    <div className="relative flex">
      <div className="h-8 w-8 rounded-full bg-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
        <span className="flex h-full w-full items-center justify-center text-xs text-[#A8A8A8]">
          +{props.likes}
        </span>
      </div>
      <div className="z-2 relative mt-4 -ml-2 self-end">
        <i className="fa-solid fa-heart fa-sm" style={{ color: '#ff8c00' }}></i>
      </div>
    </div>
  )
}

export default PersonsLiked
