package com.example.jungsan.transferplanner;

import com.example.jungsan.model.Transfer;
import java.util.List;
import java.util.Map;

public interface TransferPlanner {
    List<Transfer> plan(Map<String, Integer> roundedRemainings);
}
