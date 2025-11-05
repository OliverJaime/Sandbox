export interface RatingProps {
  p: p;
}

type p = {
  StarRating: number;
};

export const RatingStars = (props: RatingProps) => {
  if(props.p.StarRating > 4.8) {
    return (
      <div className="text-amber-400 star-shadow">
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
      </div>
    );
  } else if(props.p.StarRating > 4.4) {
    return (
      <div className="text-amber-400 star-shadow">
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star_half</span>
      </div>
    );
  } else if(props.p.StarRating > 3.8) {
    return (
      <div className="text-amber-400 star-shadow">
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star_outline</span>
      </div>
    );
  } else if(props.p.StarRating > 3.4) {
    return (
      <div className="text-amber-400 star-shadow">
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star_half</span>
        <span className="material-icons-round">star_outline</span>
      </div>
    );
  } else if(props.p.StarRating > 2.8) {
    return (
      <div className="text-amber-400 star-shadow">
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star_outline</span>
        <span className="material-icons-round">star_outline</span>
      </div>
    );
  } else if(props.p.StarRating > 2.4) {
    return (
      <div className="text-amber-400 star-shadow">
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star_half</span>
        <span className="material-icons-round">star_outline</span>
        <span className="material-icons-round">star_outline</span>
      </div>
    );
  } else if(props.p.StarRating > 1.8) {
    return (
      <div className="text-amber-400 star-shadow">
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star_outline</span>
        <span className="material-icons-round">star_outline</span>
        <span className="material-icons-round">star_outline</span>
      </div>
    );
  } else if(props.p.StarRating > 1.4) {
    return (
      <div className="text-amber-400 star-shadow">
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star_half</span>
        <span className="material-icons-round">star_outline</span>
        <span className="material-icons-round">star_outline</span>
        <span className="material-icons-round">star_outline</span>
      </div>
    );
  } else {
    return (
      <div className="text-amber-400 star-shadow">
        <span className="material-icons-round">star</span>
        <span className="material-icons-round">star_outline</span>
        <span className="material-icons-round">star_outline</span>
        <span className="material-icons-round">star_outline</span>
        <span className="material-icons-round">star_outline</span>
      </div>
    );
  }
};
