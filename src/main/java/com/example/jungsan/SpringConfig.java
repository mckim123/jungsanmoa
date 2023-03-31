package com.example.jungsan;

import com.example.jungsan.transferplanner.SacrificialTransferPlanner;
import com.example.jungsan.transferplanner.TransferPlanner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    @Bean
    public TransferPlanner transferPlanner() {
        return new SacrificialTransferPlanner();
    }
}
