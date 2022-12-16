package com.tekrewards.application.main.dto;

import com.tekrewards.application.main.pojo.ChartPojo;

import java.util.HashMap;
import java.util.List;

public class ChartDetailsResponse {
    private  String status;
//    private HashMap<String , Integer> chartDetails;
    List<ChartPojo> chartDetails;

    public List<ChartPojo> getChartDetails() {
        return chartDetails;
    }

    public void setChartDetails(List<ChartPojo> chartDetails) {
        this.chartDetails = chartDetails;
    }

    public ChartDetailsResponse() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

//    public HashMap<String, Integer> getChartDetails() {
//        return chartDetails;
//    }
//
//    public void setChartDetails(HashMap<String, Integer> chartDetails) {
//        this.chartDetails = chartDetails;
//    }
}
