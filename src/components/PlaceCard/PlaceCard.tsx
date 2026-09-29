import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import type { Place } from "../../types/place";

interface PlaceCardProps {
  place: Place;
  onClose: () => void;
}

const PlaceCard = ({
  place,
  onClose,
}: PlaceCardProps) => {
  return (
    <Card className="place-card">
      <div className="place-card-header">
        <div className="place-title">
          <div className="place-icon">
            <LocationOnOutlinedIcon />
          </div>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {place.name}
          </Typography>
        </div>

        <IconButton
          size="small"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>

      <Divider />

      <CardContent className="place-card-content">
        <Typography
          sx={{
            fontSize: 12,
            color: "text.secondary",
            lineHeight: 2,
          }}
        >
          {place.description}
        </Typography>

        <div className="place-address">
          <LocationOnOutlinedIcon />

          <Typography
            sx={{
              fontSize: 11,
            }}
          >
            {place.address}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;