import * as React from "react";
import "./style.scss";
import { apiKey } from "../config";
import { observer } from "mobx-react";

const params = { v: "3.exp", key: apiKey };

interface IProps {
    lat: number;
    lon: number;
    width?: number;
    height?: number;
}

@observer
export default class GoogleMap extends React.Component<IProps> {
    public render() {
        const { lat, lon, width, height } = this.props;

        return (
            <div className="googleMapContainer">
                <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=
                    ${lat},${lon}
                    &zoom=15&size=${width ? width : 300}x${height ? height : 300}&maptype=roadmap&markers=
                    ${lat},${lon}
                    &key=${params.key}`}
                />
            </div>
        );
    }
}
