package com.tekrewards.application.main.dto;

import com.tekrewards.application.main.pojo.WinnerForChart;

import java.util.List;

public class WinnerForChartResponse {
    private String status;
    private List<WinnerForChart> winnerForCharts;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<WinnerForChart> getWinnerForCharts() {
        return winnerForCharts;
    }

    public void setWinnerForCharts(List<WinnerForChart> winnerForCharts) {
        this.winnerForCharts = winnerForCharts;
    }

    public WinnerForChartResponse() {

    }
}
