package com.school.sms.fee;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/fees")
@RequiredArgsConstructor
public class FeeController {

    private final FeeService service;

    @PostMapping("/student/{studentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FeeRecord> createFee(
            @PathVariable Integer studentId,
            @RequestBody FeeRecord feeRecord
    ) {
        return ResponseEntity.ok(service.createFeeRecord(studentId, feeRecord));
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT', 'PARENT')")
    public ResponseEntity<List<FeeRecord>> getStudentFees(@PathVariable Integer studentId) {
        return ResponseEntity.ok(service.getStudentFees(studentId));
    }

    @PostMapping("/{feeId}/payment")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FeeRecord> recordPayment(
            @PathVariable Integer feeId,
            @RequestParam BigDecimal amount
    ) {
        return ResponseEntity.ok(service.recordPayment(feeId, amount));
    }
}
