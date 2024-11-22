package com.newmes.onpremise.domains.report.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Detection {

        @JsonProperty("Box_X1")
        private double boxX1;

        @JsonProperty("Box_Y1")
        private double boxY1;

        @JsonProperty("Box_X2")
        private double boxX2;

        @JsonProperty("Box_Y2")
        private double boxY2;

        @JsonProperty("Width")
        private double width;

        @JsonProperty("Height")
        private double height;

        @JsonProperty("Center_x")
        private double centerX;

        @JsonProperty("Center_y")
        private double centerY;

        @JsonProperty("Confidence")
        private double confidence;
}
