package com.example.jungsan;

import com.example.jungsan.transferplanner.SacrificialTransferPlanner;
import com.example.jungsan.transferplanner.TransferPlanner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    @Bean
    public TransferPlanner transferPlanner() {
        return new SacrificialTransferPlanner();
    }
}
