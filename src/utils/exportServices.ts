import { Stage1To3Data, DiagnosticReport, ScratchpadTelemetry } from '../types';

// Helper to check if external scripts are loaded
const getDocxLib = () => (window as any).docx;
const getPptxLib = () => (window as any).PptxGenJS;

export const isExportAvailable = () => {
  return !!getDocxLib() && !!getPptxLib();
};

// Export to PowerPoint (.pptx)
export const exportToPPTX = async (data: Stage1To3Data, problemTitle: string) => {
  const PptxGenJS = getPptxLib();
  if (!PptxGenJS) {
    alert('Thư viện PPTXGenJS chưa được tải hoàn tất. Vui lòng tải lại trang.');
    return;
  }

  const pptx = new PptxGenJS();
  
  // Set presentation properties
  pptx.layout = 'LAYOUT_16x9';

  // Theme colors
  const primaryColor = '4F46E5'; // Indigo
  const secondaryColor = '0891B2'; // Cyan
  const darkTextColor = '1E293B';
  const lightBgColor = 'F8FAFC';

  // ----------------------------------------------------
  // Slide 1: Cover Slide
  // ----------------------------------------------------
  const slide1 = pptx.addSlide();
  slide1.background = { fill: lightBgColor };
  
  // Draw primary accent line
  slide1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.4, h: 5.625, fill: { color: primaryColor } });
  
  // Title
  slide1.addText('AIEdu_Video', {
    x: 0.8, y: 1.2, w: 8.0, h: 0.6,
    fontSize: 28, bold: true, color: primaryColor,
    fontFace: 'Arial'
  });
  
  slide1.addText('Bài Giảng Sư Phạm Tương Tác Đa Tầng', {
    x: 0.8, y: 1.8, w: 8.0, h: 0.4,
    fontSize: 16, color: '64748B',
    fontFace: 'Arial'
  });

  slide1.addText(`Chủ đề: ${problemTitle}`, {
    x: 0.8, y: 2.8, w: 8.5, h: 1.5,
    fontSize: 22, bold: true, color: darkTextColor,
    fontFace: 'Arial',
    valign: 'middle'
  });

  slide1.addText('Hệ Sinh Thái Học Tập Thích Ứng 4 Giai Đoạn (Vận hành bởi Gemini AI)', {
    x: 0.8, y: 4.8, w: 8.0, h: 0.4,
    fontSize: 10, italic: true, color: '94A3B8',
    fontFace: 'Arial'
  });

  // ----------------------------------------------------
  // Slide 2: Original Problem Statement (OCR)
  // ----------------------------------------------------
  const slide2 = pptx.addSlide();
  slide2.addText('Đề bài & Khái niệm nền tảng', { x: 0.5, y: 0.4, w: 9.0, h: 0.5, fontSize: 20, bold: true, color: primaryColor });
  
  // Box for OCR text
  slide2.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 1.1, w: 9.0, h: 2.2, fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1 } });
  slide2.addText(data.ocrData || 'Chưa có đề bài phân tích.', {
    x: 0.7, y: 1.2, w: 8.6, h: 2.0,
    fontSize: 13, color: darkTextColor, fontFace: 'Courier New',
    valign: 'top'
  });

  // Visual cues or instructions
  slide2.addText('Chỉ dẫn Sư phạm:', { x: 0.5, y: 3.5, w: 3.0, h: 0.3, fontSize: 13, bold: true, color: secondaryColor });
  slide2.addText(`- Tông giọng giảng: ${data.pedagogicalPrompt?.tone || 'Chuyên sâu & mạch lạc'}\n- Nhịp độ: ${data.pedagogicalPrompt?.pace || 'Thừa thả, giải thích chi tiết'}`, {
    x: 0.5, y: 3.9, w: 9.0, h: 1.2,
    fontSize: 12, color: '475569', fontFace: 'Arial'
  });

  // ----------------------------------------------------
  // Slide 3: Micro Logic Steps
  // ----------------------------------------------------
  const slide3 = pptx.addSlide();
  slide3.addText('Chuỗi bước tư duy logic siêu nhỏ (Micro-Steps)', { x: 0.5, y: 0.4, w: 9.0, h: 0.5, fontSize: 20, bold: true, color: primaryColor });

  const steps = data.logicSteps || [];
  let yOffset = 1.0;
  
  steps.slice(0, 4).forEach((step, idx) => {
    // Number circle badge
    slide3.addShape(pptx.ShapeType.oval, { x: 0.5, y: yOffset + 0.05, w: 0.35, h: 0.35, fill: { color: primaryColor } });
    slide3.addText((idx + 1).toString(), { x: 0.5, y: yOffset + 0.05, w: 0.35, h: 0.35, fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });

    // Step Title & Content
    slide3.addText(step.title, { x: 1.0, y: yOffset, w: 8.5, h: 0.25, fontSize: 12, bold: true, color: darkTextColor });
    slide3.addText(step.content, { x: 1.0, y: yOffset + 0.28, w: 8.5, h: 0.5, fontSize: 10.5, color: '475569', fontFace: 'Arial' });
    
    // Formula badge if available
    if (step.keyFormula) {
      slide3.addText(`Công thức: ${step.keyFormula}`, { x: 7.2, y: yOffset, w: 2.3, h: 0.25, fontSize: 10, bold: true, color: 'B45309', align: 'right' });
    }

    yOffset += 1.0;
  });

  // ----------------------------------------------------
  // Slide 4: Interactive Video Script Timeline
  // ----------------------------------------------------
  const slide4 = pptx.addSlide();
  slide4.addText('Kịch bản AI Video & Đồ họa động', { x: 0.5, y: 0.4, w: 9.0, h: 0.5, fontSize: 20, bold: true, color: primaryColor });

  const scriptTurns = data.videoScript || [];
  let scYOffset = 1.0;

  scriptTurns.slice(0, 3).forEach((turn) => {
    // Timestamp box
    slide4.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: scYOffset + 0.05, w: 1.1, h: 0.35, fill: { color: 'E0F2FE' }, line: { color: 'bae6fd', width: 1 } });
    slide4.addText(`Thời gian: ${turn.timeSeconds}s`, { x: 0.5, y: scYOffset + 0.05, w: 1.1, h: 0.35, fontSize: 10, bold: true, color: '0369A1', align: 'center', valign: 'middle' });

    // Avatar dialogue
    slide4.addText(`AI Lời nói: "${turn.speakerText}"`, { x: 1.8, y: scYOffset, w: 4.8, h: 1.0, fontSize: 11, italic: true, color: darkTextColor, valign: 'top' });
    
    // Visual / Motion notes
    slide4.addShape(pptx.ShapeType.roundRect, { x: 6.8, y: scYOffset, w: 2.7, h: 0.9, fill: { color: 'F1F5F9' } });
    slide4.addText(`Bảng vẽ: ${turn.motionGraphicNote}\n[Cue: ${turn.visualCue}]`, { x: 6.9, y: scYOffset + 0.05, w: 2.5, h: 0.8, fontSize: 9.5, color: '334155', valign: 'top' });

    scYOffset += 1.3;
  });

  // ----------------------------------------------------
  // Slide 5: Pop-up Quiz Gatekeeper
  // ----------------------------------------------------
  const quiz = data.popupQuiz;
  if (quiz) {
    const slide5 = pptx.addSlide();
    slide5.addText('Pop-up Quiz Chốt chặn Tương tác', { x: 0.5, y: 0.4, w: 9.0, h: 0.5, fontSize: 20, bold: true, color: primaryColor });

    // Question
    slide5.addText(quiz.question, { x: 0.5, y: 1.0, w: 9.0, h: 0.8, fontSize: 15, bold: true, color: darkTextColor });

    // Options (rendered side-by-side or stacked)
    let optY = 1.9;
    quiz.options.forEach((opt, idx) => {
      const isCorrect = idx === quiz.correctAnswerIndex;
      const cardBg = isCorrect ? 'F0FDF4' : 'FFFFFF';
      const cardBorder = isCorrect ? '22C55E' : 'CBD5E1';
      
      slide5.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: optY, w: 4.2, h: 0.6, fill: { color: cardBg }, line: { color: cardBorder, width: 1 } });
      slide5.addText(`${String.fromCharCode(65 + idx)}. ${opt}`, { x: 0.7, y: optY + 0.05, w: 3.8, h: 0.5, fontSize: 11, bold: isCorrect, color: isCorrect ? '166534' : darkTextColor, valign: 'middle' });

      // Parallelize into 2 columns
      if (idx % 2 === 1) optY += 0.8;
    });

    // Explanation at bottom
    slide5.addText(`Lời khuyên sư phạm: ${quiz.gatekeeperMessage}`, { x: 0.5, y: 4.4, w: 9.0, h: 0.4, fontSize: 11, bold: true, color: 'D97706', fontFace: 'Arial' });
    slide5.addText(`Đáp án đúng: ${String.fromCharCode(65 + quiz.correctAnswerIndex)} - ${quiz.options[quiz.correctAnswerIndex]}`, { x: 0.5, y: 4.8, w: 9.0, h: 0.4, fontSize: 11, color: '475569' });
  }

  // Save PPTX
  pptx.writeFile({ fileName: `AIEdu_Lecture_${problemTitle.substring(0, 15).replace(/\s+/g, '_')}.pptx` });
};

// Export to Word (.docx)
export const exportToDOCX = async (
  data: Stage1To3Data,
  report: DiagnosticReport | null,
  telemetry: ScratchpadTelemetry | null,
  problemTitle: string
) => {
  const docx = getDocxLib();
  if (!docx) {
    alert('Thư viện DOCX chưa được tải hoàn tất. Vui lòng tải lại trang.');
    return;
  }

  const { Document, Paragraph, TextRun, Packer, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } = docx;

  // Layout styling definitions
  const borderThin = { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' };
  
  const createHeading = (text: string, level: any, color: string) => {
    return new Paragraph({
      heading: level,
      spacing: { before: 200, after: 120 },
      children: [
        new TextRun({
          text,
          bold: true,
          color,
          font: 'Arial',
        }),
      ],
    });
  };

  const createBullet = (text: string, boldPrefix?: string) => {
    const children = [];
    if (boldPrefix) {
      children.push(new TextRun({ text: boldPrefix, bold: true, font: 'Arial' }));
    }
    children.push(new TextRun({ text, font: 'Arial' }));
    
    return new Paragraph({
      spacing: { before: 60, after: 60 },
      bullet: { level: 0 },
      children,
    });
  };

  const docChildren: any[] = [];

  // 1. Header & Title Section
  docChildren.push(
    new Paragraph({
      alignment: 'center',
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: 'AIEDU_VIDEO - PHIẾU HỌC TẬP THÍCH ỨNG',
          bold: true,
          fontSize: 32,
          color: '4F46E5',
          font: 'Arial',
        }),
      ],
    })
  );

  docChildren.push(
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({ text: 'Chủ đề bài học: ', bold: true, color: '1E293B', font: 'Arial' }),
        new TextRun({ text: problemTitle, bold: true, color: '000000', font: 'Arial' }),
      ],
    })
  );

  // 2. OCR Problem Section
  docChildren.push(createHeading('I. ĐỀ BÀI TOÁN GỐC (OCR DATA)', HeadingLevel.HEADING_2, '4F46E5'));
  
  // Custom styled border box for problem
  docChildren.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: borderThin, bottom: borderThin, left: { style: BorderStyle.SINGLE, size: 12, color: '4F46E5' }, right: borderThin
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F8FAFC' },
              margins: { top: 150, bottom: 150, left: 150, right: 150 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: data.ocrData || 'Chưa có dữ liệu bài toán.',
                      font: 'Courier New',
                      fontSize: 22,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  // 3. Logic Steps Section
  docChildren.push(createHeading('II. HƯỚNG DẪN CÁC BƯỚC TƯ DUY logic (MICRO-STEPS)', HeadingLevel.HEADING_2, '4F46E5'));
  data.logicSteps?.forEach((step, idx) => {
    docChildren.push(
      new Paragraph({
        spacing: { before: 120, after: 100 },
        children: [
          new TextRun({
            text: `Bước ${step.stepNumber}: ${step.title}`,
            bold: true,
            color: '0369A1',
            font: 'Arial',
          }),
        ],
      })
    );
    docChildren.push(
      new Paragraph({
        spacing: { before: 40, after: 120 },
        indent: { left: 240 },
        children: [
          new TextRun({
            text: step.content,
            font: 'Arial',
            color: '334155',
          }),
          step.keyFormula ? new TextRun({
            text: `\n→ Công thức áp dụng: ${step.keyFormula}`,
            bold: true,
            color: 'B45309',
            font: 'Arial',
          }) : new TextRun({ text: '' }),
        ],
      })
    );
  });

  // 4. Scaffolding Homework Section
  docChildren.push(createHeading('III. PHẦN BÀI TẬP RÈN LUYỆN DÀN GIÁO (SCAFFOLDING)', HeadingLevel.HEADING_2, '4F46E5'));
  docChildren.push(
    new Paragraph({
      spacing: { after: 150 },
      children: [
        new TextRun({
          text: 'Dưới đây là 3 bài tập tự luyện có độ khó nâng cấp dần (+10%, +20%, +30%) do AI lập trình dành riêng cho bạn:',
          italic: true,
          font: 'Arial',
          color: '475569',
        }),
      ],
    })
  );

  data.exercises?.forEach((ex, idx) => {
    docChildren.push(
      new Paragraph({
        spacing: { before: 140, after: 80 },
        children: [
          new TextRun({
            text: `Bài Tập ${idx + 1} (${ex.tier} - ${ex.difficultyLabel}): ${ex.title}`,
            bold: true,
            color: 'D97706',
            font: 'Arial',
          }),
        ],
      })
    );
    
    docChildren.push(
      new Paragraph({
        spacing: { before: 40, after: 140 },
        indent: { left: 240 },
        children: [
          new TextRun({ text: ex.problemText, font: 'Arial', bold: true }),
          new TextRun({ text: `\n*Gợi ý từ AI: ${ex.hint}`, font: 'Arial', italic: true, color: '64748B' }),
        ],
      })
    );

    // Spacing lines for student handwriting
    docChildren.push(
      new Paragraph({
        spacing: { before: 200, after: 200 },
        children: [
          new TextRun({
            text: 'Lời giải: .................................................................................................................................................\n.................................................................................................................................................................\n.................................................................................................................................................................',
            color: 'CBD5E1',
            font: 'Arial',
          }),
        ],
      })
    );
  });

  // 5. Diagnostic Report Section (If available)
  if (report) {
    docChildren.push(createHeading('IV. KẾT QUẢ CHẨN ĐOÁN TIẾN TRÌNH & SỬA LỖI', HeadingLevel.HEADING_2, '4F46E5'));
    
    // Performance Scores table
    docChildren.push(
      new Paragraph({
        spacing: { before: 100, after: 80 },
        children: [
          new TextRun({
            text: `Điểm Số Tiến Trình: ${report.processScore}/100`,
            bold: true,
            fontSize: 26,
            color: report.processScore >= 70 ? '16A34A' : 'DC2626',
            font: 'Arial',
          }),
        ],
      })
    );

    docChildren.push(createBullet(`Tư Duy Logic: ${report.scoreBreakdown?.logicalReasoning}%`, '• '));
    docChildren.push(createBullet(`Độ Chính Xác Tính Toán: ${report.scoreBreakdown?.calculationAccuracy}%`, '• '));
    docChildren.push(createBullet(`Độ Trình Bày Mạch Lạc: ${report.scoreBreakdown?.clarity}%`, '• '));

    if (telemetry) {
      docChildren.push(
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [
            new TextRun({ text: 'Chỉ số vẽ bảng nháp: ', bold: true, font: 'Arial' }),
            new TextRun({
              text: `${telemetry.strokeCount} nét vẽ, ${telemetry.eraseCount} lần tẩy xóa, hoàn thành trong ${Math.floor(telemetry.drawDurationSeconds / 60)}p ${telemetry.drawDurationSeconds % 60}s. (${telemetry.hesitationScore})`,
              font: 'Arial',
              color: '475569',
            }),
          ],
        })
      );
    }

    docChildren.push(
      new Paragraph({
        spacing: { before: 120, after: 80 },
        children: [
          new TextRun({ text: '1. Phân Tích Nguyên Nhân Gốc Rễ Lỗi Sai (Root Cause):', bold: true, color: 'B45309', font: 'Arial' }),
        ],
      })
    );
    docChildren.push(createBullet(report.rootCauseAnalysis?.coreGap || 'Chưa ghi nhận.', 'Lỗ hổng cốt lõi: '));
    docChildren.push(createBullet(report.rootCauseAnalysis?.misconceptionType || 'Chưa ghi nhận.', 'Dạng nhầm lẫn: '));
    docChildren.push(createBullet(report.rootCauseAnalysis?.detailedExplanation || 'Chưa ghi nhận.', 'Chi tiết: '));

    docChildren.push(
      new Paragraph({
        spacing: { before: 120, after: 80 },
        children: [
          new TextRun({ text: '2. Lời Khuyên Sư Phạm Của AI Mentor:', bold: true, color: '4F46E5', font: 'Arial' }),
        ],
      })
    );
    docChildren.push(
      new Paragraph({
        spacing: { before: 40, after: 120 },
        indent: { left: 240 },
        children: [
          new TextRun({
            text: `"${report.mentorFeedback}"`,
            font: 'Arial',
            italic: true,
            color: '312E81',
          }),
        ],
      })
    );

    const road = report.remedialRoadmap;
    if (road) {
      docChildren.push(
        new Paragraph({
          spacing: { before: 120, after: 80 },
          children: [
            new TextRun({ text: '3. Lộ Trình Khắc Phục (Remedial Roadmap):', bold: true, color: '059669', font: 'Arial' }),
          ],
        })
      );
      docChildren.push(createBullet(road.recapSummary, `Ôn tập khái niệm "${road.recapConceptName}": `));
      
      const q = road.quickFixQuestion;
      if (q) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 100, after: 80 },
            indent: { left: 240 },
            children: [
              new TextRun({ text: `* Bài kiểm tra nhanh (Quick Fix):\n${q.question}`, bold: true, font: 'Arial', color: '1E293B' }),
            ],
          })
        );
        q.options.forEach((opt, oIdx) => {
          const isCorrect = oIdx === q.correctAnswerIndex;
          docChildren.push(
            new Paragraph({
              spacing: { before: 40, after: 40 },
              indent: { left: 480 },
              children: [
                new TextRun({
                  text: `- [${isCorrect ? 'x' : ' '}] ${opt} ${isCorrect ? '(Đáp án đúng)' : ''}`,
                  font: 'Arial',
                  color: isCorrect ? '16A34A' : '475569',
                }),
              ],
            })
          );
        });
      }
    }
  }

  // Build document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: docChildren,
      },
    ],
  });

  // Pack and trigger download
  Packer.toBlob(doc).then((blob: Blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AIEdu_PhieuHocTap_${problemTitle.substring(0, 15).replace(/\s+/g, '_')}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }).catch((err: any) => {
    console.error('Lỗi khi Packer sinh file docx:', err);
    alert('Không thể tạo file Word.');
  });
};
