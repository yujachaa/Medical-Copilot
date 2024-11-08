package com.newmes.onpremise.domains.report.domain;

import lombok.Data;

@Data
public class Detection {
        private double boxX1;
        private double boxY1;
        private double boxX2;
        private double boxY2;
        private double width;
        private double height;
        private double centerX;
        private double centerY;
        private double confidence;
}
