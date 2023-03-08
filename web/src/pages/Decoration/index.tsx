import { useQuery } from "@apollo/client";
import { DECORATION } from "../../graphql/queries";
import {
  Decoration as DecorationData,
  DecorationVariables,
} from "../../graphql/queries/decoration/types";
import { useParams } from "react-router-dom";
import { DecorationLoading } from "./components";
import { Eye, Star } from "phosphor-react";

export const Decoration: React.FC = () => {
  const { decorationId } = useParams();

  const { data, loading, error } = useQuery<
    DecorationData,
    DecorationVariables
  >(DECORATION, {
    variables: {
      id: decorationId,
    },
  });

  const decoration = data ? data.decoration : null;

  if (loading) {
    return <DecorationLoading />;
  }

  return (
    <div className="mx-96 my-5">
      <h1 className="text-3xl font-semibold">{decoration?.name}</h1>
      <div className="flex items-center font-semibold text-sm">
        <span className="flex items-center">
          <Star size={20} color="#040043" weight="fill" />
          &nbsp;
          {decoration?.numRatings === 0 ? "No Ratings Yet" : decoration?.rating}
        </span>
        <span className="mx-2">|</span>
        <span className="flex items-center">
          <Eye size={20} color="#040043" weight="fill" />
          &nbsp;
          {decoration?.views === 0 ? "No Views Yet" : decoration?.views}
        </span>
        <span className="mx-2">|</span>
        <span>
          {decoration?.city}, {decoration?.country}
        </span>
      </div>
      <div className="image-grid">
        <img
          src={decoration?.images[0]}
          alt="Christmas decoration"
          className="image-grid-col-2 image-grid-row-2 rounded-tl-xl rounded-bl-xl"
        />
        <img
          src={decoration?.images[1]}
          alt="Christmas Decoration"
          className="rounded-tr-xl"
        />
        <img
          src={decoration?.images[2]}
          alt="Christmas Decoration"
          className="rounded-br-xl"
        />
      </div>
    </div>
  );
};
