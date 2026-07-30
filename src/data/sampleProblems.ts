import { ProblemInput, Stage1To3Data, DiagnosticReport } from '../types';

export interface SampleProblemItem {
  id: string;
  name: string;
  subject: string;
  grade: string;
  previewText: string;
  input: ProblemInput;
  presetData: Stage1To3Data;
  presetReport: DiagnosticReport;
}

export const SAMPLE_PROBLEMS: SampleProblemItem[] = [
  {
    id: 'toan-6-pt',
    name: 'Toán 6: Tỉ Số Phần Trăm',
    subject: 'Toán Số Học',
    grade: 'Lớp 6',
    previewText: 'Cửa hàng giảm giá 10% ba lô 500k. Mua thêm bộ dụng cụ 120k giảm 15%. Tính tổng tiền.',
    input: {
      problemText: 'Một cửa hàng bán một chiếc ba lô với giá niêm yết là 500.000 đồng. Nhân ngày khai giảng, cửa hàng giảm giá 10% chiếc ba lô đó. Ngoài ra, nếu học sinh mua thêm một bộ dụng cụ học tập giá 120.000 đồng thì bộ dụng cụ đó được giảm giá 15%. Tính tổng số tiền một học sinh phải trả khi mua cả hai món đồ trên.',
      gradeLevel: 'lop_6',
      tone: 'chuyên_sâu',
      subject: 'toán'
    },
    presetData: {
      ocrData: 'Ba lô: 500.000đ (giảm 10%). Bộ dụng cụ: 120.000đ (giảm 15%). Tổng tiền = ?',
      logicSteps: [
        {
          stepNumber: 1,
          title: 'Tính giá tiền ba lô sau khi giảm 10%',
          content: 'Giá bán của chiếc ba lô sau khi giảm giá 10% là: 500.000 × (1 - 10%) = 450.000 (đồng).',
          keyFormula: 'Giá bán = Giá gốc × (1 - %giảm)',
          keywords: ['Tỉ số phần trăm', 'Giảm giá ba lô']
        },
        {
          stepNumber: 2,
          title: 'Tính giá tiền bộ dụng cụ sau khi giảm 15%',
          content: 'Giá bán của bộ dụng cụ học tập sau khi giảm giá 15% là: 120.000 × (1 - 15%) = 102.000 (đồng).',
          keyFormula: 'Giá bán = Giá gốc × (1 - %giảm)',
          keywords: ['Tỉ số phần trăm', 'Giảm giá dụng cụ']
        },
        {
          stepNumber: 3,
          title: 'Tính tổng số tiền phải trả',
          content: 'Tổng số tiền học sinh đó phải trả khi mua cả hai món đồ trên là: 450.000 + 102.000 = 552.000 (đồng).',
          keyFormula: 'Tổng tiền = Giá ba lô + Giá dụng cụ',
          keywords: ['Phép cộng', 'Tổng số tiền']
        }
      ],
      pedagogicalPrompt: {
        tone: 'Chuyên sâu, chuẩn xác, chú trọng tính chặt chẽ sư phạm',
        pace: 'Chậm ở bước tính tỉ lệ phần trăm để học sinh hiểu rõ công thức tính giá sau giảm.',
        emphasisPoints: [
          '[Nhấn mạnh / Chậm lại] Giải thích rõ tại sao giảm 10% nghĩa là nhân với (1 - 10% = 90%).',
          '[Điểm tựa visual] Hiển thị sơ đồ phần trăm thanh kéo giảm giá trên bảng.'
        ],
        keyVisuals: ['Sơ đồ thanh kéo giảm giá 10% và 15%', 'Bảng cộng tổng chi phí']
      },
      videoScript: [
        {
          timeSeconds: 0,
          speakerText: 'Chào các em! Chúng ta cùng giải bài toán thực tế lớp 6 về tính tỉ số phần trăm giảm giá của cửa hàng nhé.',
          motionGraphicNote: 'Hiển thị đề bài toán và nhấn mạnh hai mức giảm giá: 10% cho ba lô và 15% cho dụng cụ học tập.',
          visualCue: 'Đề bài và các mốc giảm giá sáng lên'
        },
        {
          timeSeconds: 6,
          speakerText: 'Đầu tiên, hãy tính giá tiền chiếc ba lô sau khi giảm 10%. Ta lấy giá niêm yết 500.000 nhân với 1 trừ 10%, tức là 90%. Kết quả ra 450.000 đồng.',
          motionGraphicNote: 'Viết phép tính: 500.000 × (1 - 10%) = 450.000 đồng bằng phấn vàng.',
          visualCue: 'Viết công thức tính ba lô'
        },
        {
          timeSeconds: 14,
          speakerText: 'Tương tự với bộ dụng cụ học tập, ta giảm giá 15%. Phép tính sẽ là 120.000 nhân với 85%. Ta được 102.000 đồng.',
          motionGraphicNote: 'Viết phép tính: 120.000 × (1 - 15%) = 102.000 đồng bằng phấn xanh.',
          visualCue: 'Viết công thức tính bộ dụng cụ'
        },
        {
          timeSeconds: 22,
          speakerText: 'Hãy trả lời nhanh câu hỏi trắc nghiệm sau đây trước khi chúng ta tính tổng số tiền nhé!',
          motionGraphicNote: 'Tạm dừng video - Xuất hiện bảng Pop-up Quiz chốt chặn.',
          visualCue: 'Kích hoạt Pop-up Quiz'
        }
      ],
      popupQuiz: {
        question: 'Khi tính số tiền giảm giá 10% của 500.000 đồng, ta thực hiện phép tính nào sau đây nhanh nhất?',
        options: [
          'A. Lấy 500.000 nhân với 0.1',
          'B. Lấy 500.000 chia cho 10',
          'C. Cả hai cách trên đều đúng và cho kết quả 50.000đ',
          'D. Lấy 500.000 trừ đi 10'
        ],
        correctAnswerIndex: 2,
        explanation: 'Giảm 10% tương đương với lấy giá gốc nhân 0.1 hoặc chia cho 10. Cả hai phép tính đều cho kết quả là 50.000 đồng tiền giảm giá.',
        gatekeeperMessage: 'Chính xác! Bạn đã nắm chắc kỹ năng nhẩm tỉ số phần trăm nhanh!'
      },
      exercises: [
        {
          tier: '+10%',
          difficultyLabel: 'Cơ bản (+10%)',
          title: 'Bài tập 1: Tính giảm giá hộp bút',
          problemText: 'Một hộp bút học sinh có giá niêm yết là 80.000 đồng. Nhân ngày Quốc tế Thiếu nhi, cửa hàng giảm giá 20% cho hộp bút này. Tính số tiền học sinh cần trả để mua hộp bút.',
          hint: 'Phép tính: 80.000 × (1 - 20%) = 80.000 × 0.8 = 64.000 đồng.'
        },
        {
          tier: '+20%',
          difficultyLabel: 'Khá (+20%)',
          title: 'Bài tập 2: Giảm giá áo và quần',
          problemText: 'Một bộ đồng phục học sinh gồm áo giá 300.000 đồng và quần giá 250.000 đồng. Cửa hàng giảm giá 10% cho áo và giảm giá 20% cho quần. Tính tổng số tiền phải trả để mua cả bộ đồng phục.',
          hint: 'Tính giá áo sau giảm: 300.000 × 0.9 = 270.000đ. Giá quần sau giảm: 250.000 × 0.8 = 200.000đ. Tổng tiền: 470.000đ.'
        },
        {
          tier: '+30%',
          difficultyLabel: 'Giỏi (+30%)',
          title: 'Bài tập 3: Tìm giá gốc ban đầu',
          problemText: 'Một đôi giày thể thao sau khi được cửa hàng giảm giá 15% thì có giá bán thực tế là 340.000 đồng. Tính giá niêm yết ban đầu của đôi giày khi chưa giảm giá.',
          hint: 'Gọi giá gốc là x. Ta có x × (1 - 15%) = 340.000 ⇒ x = 340.000 ÷ 0.85 = 400.000 đồng.'
        }
      ]
    },
    presetReport: {
      processScore: 92,
      scoreBreakdown: {
        logicalReasoning: 95,
        calculationAccuracy: 90,
        clarity: 92
      },
      errorHeatmap: [
        {
          stepName: 'Bước 1: Tính giá ba lô sau giảm',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Tính chính xác giá ba lô mới: 500.000 × 0.9 = 450.000 đồng.',
          studentAttempt: 'Gia ba lo: 500 000 * 0.9 = 450 000 dong',
          correctLogic: '500.000 × 0.9 = 450.000 đồng'
        },
        {
          stepName: 'Bước 2: Tính giá bộ dụng cụ sau giảm',
          status: 'yellow',
          statusLabel: 'Sai số nhỏ',
          detail: 'Học sinh ghi nhầm 120.000 × 0.85 = 105.000 đồng trên bảng nháp do nhẩm sai phép nhân, sau đó đã tự tẩy xóa và sửa lại thành 102.000 đồng.',
          studentAttempt: 'Gia dung cu: 120 000 * 0.85 = 105 000 -> 102 000 dong',
          correctLogic: '120.000 × 0.85 = 102.000 đồng'
        },
        {
          stepName: 'Bước 3: Tính tổng số tiền',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Cộng chính xác tổng hai giá tiền mới: 450.000 + 102.000 = 552.000 đồng.',
          studentAttempt: 'Tong tien: 450 000 + 102 000 = 552 000 dong',
          correctLogic: '450.000 + 102.000 = 552.000 đồng'
        }
      ],
      rootCauseAnalysis: {
        coreGap: 'Kỹ năng tính nhẩm nhân số tròn chục',
        misconceptionType: 'Nhầm lẫn bảng cửu chương khi nhân 12 với 85',
        detailedExplanation: 'Học sinh tính đúng logic nhưng gặp đôi chút khó khăn khi nhân nhẩm 120.000 với 0.85 dẫn đến ngập ngừng và phải tẩy xóa 1 lần trước khi đưa ra kết quả 102.000.'
      },
      mentorFeedback: 'Thầy rất khen ngợi tính tự lập và cẩn thận của em! Mạch tư duy của em hoàn toàn đúng đắn, phép tính sau khi sửa lại đã chính xác 100%. Hãy tự tin lên nhé!',
      remedialRoadmap: {
        recapConceptName: 'Phép nhân số thập phân với số tròn chục',
        recapSummary: 'Để nhân nhanh 120.000 với 0.85, ta có thể lấy 120 × 850 = 12 × 8500. Phân tích: 12 × 85 = 12 × (80 + 5) = 960 + 60 = 1020.',
        quickFixQuestions: [
          {
            question: 'Kết quả của phép tính nhẩm 140.000 × (1 - 15%) là bao nhiêu?',
            options: ['A. 119.000 đồng', 'B. 120.000 đồng', 'C. 121.000 đồng', 'D. 118.000 đồng'],
            correctAnswerIndex: 0,
            explanation: '140.000 × 0.85 = 14 × 8.500 = 119.000 đồng.'
          },
          {
            question: 'Kết quả của phép tính nhẩm 80.000 × (1 - 25%) là bao nhiêu?',
            options: ['A. 60.000 đồng', 'B. 55.000 đồng', 'C. 50.000 đồng', 'D. 65.000 đồng'],
            correctAnswerIndex: 0,
            explanation: '80.000 × 0.75 = 60.000 đồng.'
          },
          {
            question: 'Nhẩm nhanh 200.000 giảm giá 15% còn bao nhiêu?',
            options: ['A. 170.000 đồng', 'B. 180.000 đồng', 'C. 190.000 đồng', 'D. 160.000 đồng'],
            correctAnswerIndex: 0,
            explanation: '200.000 × 0.85 = 170.000 đồng.'
          },
          {
            question: 'Nhẩm nhanh 150.000 giảm giá 20% còn bao nhiêu?',
            options: ['A. 120.000 đồng', 'B. 130.000 đồng', 'C. 110.000 đồng', 'D. 125.000 đồng'],
            correctAnswerIndex: 0,
            explanation: '150.000 × 0.8 = 120.000 đồng.'
          },
          {
            question: 'Nhẩm nhanh 60.000 giảm giá 5% còn bao nhiêu?',
            options: ['A. 57.000 đồng', 'B. 58.000 đồng', 'C. 59.000 đồng', 'D. 56.000 đồng'],
            correctAnswerIndex: 0,
            explanation: '60.000 × 0.95 = 57.000 đồng.'
          }
        ]
      }
    }
  },
  {
    id: 'toan-7-tl',
    name: 'Toán 7: Tỉ Lệ Thức',
    subject: 'Toán Đại Số',
    grade: 'Lớp 7',
    previewText: 'Số cây 7A, 7B, 7C trồng tỉ lệ với 3; 4; 5. Lớp 7C trồng nhiều hơn 7A là 10 cây. Tính tổng số cây.',
    input: {
      problemText: 'Ba lớp 7A, 7B, 7C tham gia trồng cây xanh. Số cây trồng được của ba lớp lần lượt tỉ lệ với các số 3; 4; 5. Biết rằng lớp 7C trồng được nhiều hơn lớp 7A là 10 cây. Tính tổng số cây cả ba lớp đã trồng được.',
      gradeLevel: 'lop_7',
      tone: 'socratic',
      subject: 'toán'
    },
    presetData: {
      ocrData: 'Cây 7A, 7B, 7C tỉ lệ với 3, 4, 5. C - A = 10. Tìm A + B + C = ?',
      logicSteps: [
        {
          stepNumber: 1,
          title: 'Gọi ẩn số cây và thiết lập tỉ lệ thức',
          content: 'Gọi số cây ba lớp 7A, 7B, 7C trồng được lần lượt là x, y, z (x, y, z ∈ ℕ*). Theo đề bài, ta có: x/3 = y/4 = z/5 và z - x = 10.',
          keyFormula: 'x/3 = y/4 = z/5',
          keywords: ['Gọi ẩn số', 'Tỉ lệ thức']
        },
        {
          stepNumber: 2,
          title: 'Áp dụng tính chất dãy tỉ số bằng nhau',
          content: 'Áp dụng tính chất dãy tỉ số bằng nhau, ta có: x/3 = z/5 = (z - x)/(5 - 3) = 10/2 = 5.',
          keyFormula: 'x/a = z/c = (z-x)/(c-a)',
          keywords: ['Dãy tỉ số bằng nhau', 'z - x = 10']
        },
        {
          stepNumber: 3,
          title: 'Tìm số cây mỗi lớp và tính tổng',
          content: 'Từ x/3 = 5 ⇒ x = 15; y/4 = 5 ⇒ y = 20; z/5 = 5 ⇒ z = 25. Tổng số cây cả ba lớp là: 15 + 20 + 25 = 60 (cây).',
          keyFormula: 'Tổng = x + y + z',
          keywords: ['Tìm nghiệm', 'Tổng số cây']
        }
      ],
      pedagogicalPrompt: {
        tone: 'Socratic - Hỏi mở gợi suy nghĩ tự phát hiện',
        pace: 'Chậm rãi, đặt câu hỏi ở mỗi bước biến đổi dãy tỉ số.',
        emphasisPoints: [
          '[Nhấn mạnh / Chậm lại] Đặt câu hỏi: Hiệu số cây lớp 7C và 7A tương ứng với hiệu số phần nào trên sơ đồ?',
          '[Điểm tựa visual] Vẽ ba cột chiều cao biểu diễn tỉ lệ số cây của 3 lớp.'
        ],
        keyVisuals: ['Biểu đồ cột tỉ lệ số cây 3; 4; 5', 'Minh họa phép trừ phần z/5 - x/3']
      },
      videoScript: [
        {
          timeSeconds: 0,
          speakerText: 'Chào các em học sinh lớp 7! Chúng ta cùng giải quyết một bài toán rất quen thuộc về dãy tỉ số bằng nhau nhé.',
          motionGraphicNote: 'Hiển thị sơ đồ phân chia cây của ba lớp tương ứng với tỉ lệ 3 : 4 : 5.',
          visualCue: 'Sơ đồ cây 3 lớp tỉ lệ 3:4:5 xuất hiện'
        },
        {
          timeSeconds: 7,
          speakerText: 'Gọi số cây 3 lớp trồng là x, y, z. Đề bài cho z trừ x bằng 10. Vậy hiệu số phần tương ứng của 7C và 7A sẽ là bao nhiêu?',
          motionGraphicNote: 'Khoanh tròn phần số 5 của z và phần số 3 của x, thực hiện z - x ứng với 5 - 3 = 2 phần.',
          visualCue: 'Biểu diễn z - x ứng với 5 - 3'
        },
        {
          timeSeconds: 15,
          speakerText: 'Áp dụng tính chất dãy tỉ số bằng nhau, ta lấy hiệu số cây chia cho hiệu số phần: 10 chia 2 được 5. Hãy thử giải nhanh câu hỏi sau nhé!',
          motionGraphicNote: 'Viết công thức: (z - x) / (5 - 3) = 10 / 2 = 5.',
          visualCue: 'Công thức tính giá trị một phần'
        },
        {
          timeSeconds: 23,
          speakerText: 'Sau khi có giá trị một phần bằng 5, ta dễ dàng nhân ngược lại để tìm số cây của từng lớp.',
          motionGraphicNote: 'Tạm dừng video - Hiện Pop-up Quiz.',
          visualCue: 'Xuất hiện Pop-up Quiz'
        }
      ],
      popupQuiz: {
        question: 'Nếu ta có dãy tỉ số x/3 = y/4 = z/5, biểu thức nào sau đây bằng với dãy tỉ số trên theo tính chất dãy tỉ số bằng nhau?',
        options: [
          'A. (x + y - z) / (3 + 4 - 5)',
          'B. (x + y + z) / 12',
          'C. (z - x) / 2',
          'D. Cả 3 phương án trên đều đúng'
        ],
        correctAnswerIndex: 3,
        explanation: 'Theo tính chất dãy tỉ số bằng nhau, ta có thể cộng/trừ các tử số tương ứng với cộng/trừ các mẫu số. Cả A, B, C đều đúng tỉ lệ.',
        gatekeeperMessage: 'Chúc mừng! Bạn đã nắm vững lý thuyết cốt lõi của tính chất dãy tỉ số bằng nhau!'
      },
      exercises: [
        {
          tier: '+10%',
          difficultyLabel: 'Cơ bản (+10%)',
          title: 'Bài tập 1: Tìm hai số biết tổng',
          problemText: 'Hai lớp 7A và 7B tham gia trồng cây xanh. Số cây trồng được tỉ lệ với 4 và 5. Biết tổng số cây cả hai lớp trồng được là 45 cây. Tính số cây mỗi lớp.',
          hint: 'Gọi số cây là x, y. Ta có x/4 = y/5 và x + y = 45. Tổng số phần: 4 + 5 = 9. Giá trị 1 phần: 45 / 9 = 5.'
        },
        {
          tier: '+20%',
          difficultyLabel: 'Khá (+20%)',
          title: 'Bài tập 2: Ba lớp tỉ lệ thức',
          problemText: 'Ba lớp 7A, 7B, 7C trồng cây tỉ lệ với 3; 5; 7. Biết lớp 7C trồng được nhiều hơn lớp 7A là 16 cây. Tính tổng số cây cả ba lớp trồng được.',
          hint: 'z/7 = x/3 = (z-x)/(7-3) = 16/4 = 4. Số cây lần lượt: 12, 20, 28. Tổng: 60 cây.'
        },
        {
          tier: '+30%',
          difficultyLabel: 'Giỏi (+30%)',
          title: 'Bài tập 3: Tỉ lệ nghịch',
          problemText: 'Chia số 180 thành 3 phần tỉ lệ nghịch với các số 2; 3; 4. Tìm giá trị của phần lớn nhất.',
          hint: 'Tỉ lệ nghịch với 2, 3, 4 nghĩa là tỉ lệ thuận với 1/2, 1/3, 1/4. Nhân cả 3 phân số với 12 được tỉ lệ: 6; 4; 3.'
        }
      ]
    },
    presetReport: {
      processScore: 96,
      scoreBreakdown: {
        logicalReasoning: 98,
        calculationAccuracy: 95,
        clarity: 95
      },
      errorHeatmap: [
        {
          stepName: 'Bước 1: Gọi ẩn & Tỉ lệ thức',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Học sinh gọi ẩn đúng và thiết lập dãy tỉ số chính xác.',
          studentAttempt: 'Goi A, B, C la so cay. Ta co: A/3 = B/4 = C/5 và C - A = 10',
          correctLogic: 'x/3 = y/4 = z/5 và z - x = 10'
        },
        {
          stepName: 'Bước 2: Dãy tỉ số bằng nhau',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Áp dụng tốt hiệu số phần mẫu: 5 - 3 = 2 để tìm hằng số k = 5.',
          studentAttempt: 'A/3 = C/5 = (C - A) / (5 - 3) = 10/2 = 5',
          correctLogic: 'x/3 = z/5 = (z-x)/(5-3) = 5'
        },
        {
          stepName: 'Bước 3: Tìm số cây và Tổng',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Tìm ra A = 15, B = 20, C = 25 và tổng 60 cây chuẩn xác.',
          studentAttempt: 'A=15, B=20, C=25. Tong: 15+20+25=60 cay.',
          correctLogic: 'A=15, B=20, C=25. Tổng = 60'
        }
      ],
      rootCauseAnalysis: {
        coreGap: 'Không có lỗ hổng kiến thức',
        misconceptionType: 'Tư duy logic xuất sắc',
        detailedExplanation: 'Học sinh trình bày đầy đủ các bước, lập luận chặt chẽ và không có nét tẩy xóa nào thể hiện sự phân vân.'
      },
      mentorFeedback: 'Thầy rất tự hào về bài làm của em! Trình bày sạch đẹp, lập luận toán học vô cùng chặt chẽ. Hãy tiếp tục phát huy phong độ này nhé!',
      remedialRoadmap: {
        recapConceptName: 'Đại lượng tỉ lệ thuận và tỉ lệ thức',
        recapSummary: 'Với tỉ lệ thuận x/a = y/b = z/c, ta luôn có x/a = y/b = z/c = (x±y±z)/(a±b±c).',
        quickFixQuestions: [
          {
            question: 'Nếu x/2 = y/3 và x + y = 10 thì giá trị của y là bao nhiêu?',
            options: ['A. 6', 'B. 4', 'C. 5', 'D. 3'],
            correctAnswerIndex: 0,
            explanation: 'x/2 = y/3 = (x+y)/(2+3) = 10/5 = 2. Do đó y = 3 × 2 = 6.'
          },
          {
            question: 'Nếu a/4 = b/7 và b - a = 9 thì giá trị của a là bao nhiêu?',
            options: ['A. 12', 'B. 21', 'C. 9', 'D. 16'],
            correctAnswerIndex: 0,
            explanation: 'a/4 = b/7 = (b-a)/(7-4) = 9/3 = 3. Do đó a = 4 × 3 = 12.'
          },
          {
            question: 'Dãy tỉ số x/3 = y/4 = z/6. Biết x + y + z = 26. Tìm z.',
            options: ['A. 12', 'B. 6', 'C. 8', 'D. 10'],
            correctAnswerIndex: 0,
            explanation: 'k = 26/(3+4+6) = 2. Do đó z = 6 × 2 = 12.'
          },
          {
            question: 'Dãy tỉ số x/2 = y/5. Biết y - x = 15. Tìm x.',
            options: ['A. 10', 'B. 25', 'C. 15', 'D. 20'],
            correctAnswerIndex: 0,
            explanation: 'k = 15/(5-2) = 5. Do đó x = 2 × 5 = 10.'
          },
          {
            question: 'Dãy tỉ số a/3 = b/5. Biết a + b = 24. Tìm b.',
            options: ['A. 15', 'B. 9', 'C. 12', 'D. 10'],
            correctAnswerIndex: 0,
            explanation: 'k = 24/(3+5) = 3. Do đó b = 5 × 3 = 15.'
          }
        ]
      }
    }
  },
  {
    id: 'toan-8-pt',
    name: 'Toán 8: Lập Phương Trình',
    subject: 'Toán Đại Số',
    grade: 'Lớp 8',
    previewText: 'Ca nô xuôi dòng mất 4h, ngược dòng mất 5h. Vận tốc nước là 2 km/h. Tính khoảng cách AB.',
    input: {
      problemText: 'Một ca nô xuôi dòng từ bến A đến bến B hết 4 giờ và ngược dòng từ bến B về bến A hết 5 giờ. Biết vận tốc của dòng nước là 2 km/h. Tính khoảng cách giữa hai bến A và B.',
      gradeLevel: 'lop_8',
      tone: 'chuyên_sâu',
      subject: 'toán'
    },
    presetData: {
      ocrData: 't_xuôi = 4h; t_ngược = 5h; v_nước = 2 km/h. Tính quãng đường S = ?',
      logicSteps: [
        {
          stepNumber: 1,
          title: 'Gọi ẩn vận tốc riêng của ca nô',
          content: 'Gọi vận tốc riêng của ca nô là x (km/h, x > 2). Vận tốc xuôi dòng của ca nô là: x + 2 (km/h). Vận tốc ngược dòng của ca nô là: x - 2 (km/h).',
          keyFormula: 'v_xuôi = x + 2 ; v_ngược = x - 2',
          keywords: ['Gọi ẩn vận tốc', 'Chuyển động dòng nước']
        },
        {
          stepNumber: 2,
          title: 'Thiết lập phương trình quãng đường AB',
          content: 'Quãng đường ca nô đi xuôi dòng là: 4(x + 2) (km). Quãng đường ca nô đi ngược dòng là: 5(x - 2) (km). Vì cùng đi trên quãng đường AB nên ta có phương trình: 4(x + 2) = 5(x - 2).',
          keyFormula: '4(x + 2) = 5(x - 2)',
          keywords: ['Lập phương trình', 'Quãng đường AB']
        },
        {
          stepNumber: 3,
          title: 'Giải phương trình tìm x và tính quãng đường S',
          content: 'Giải phương trình: 4x + 8 = 5x - 10 ⇒ x = 18. Vậy vận tốc riêng ca nô là 18 km/h. Khoảng cách giữa hai bến AB là: S = 4 × (18 + 2) = 80 (km).',
          keyFormula: 'S = t_xuôi × (x + v_nước)',
          keywords: ['Giải phương trình', 'Khoảng cách AB']
        }
      ],
      pedagogicalPrompt: {
        tone: 'Chuyên sâu, mạch lạc, giải thích chi tiết vật lý dòng nước',
        pace: 'Vừa phải, nhấn mạnh bước thiết lập quan hệ quãng đường bằng nhau.',
        emphasisPoints: [
          '[Nhấn mạnh / Chậm lại] Vận tốc xuôi dòng luôn lớn hơn vận tốc ngược dòng đúng bằng 2 lần vận tốc dòng nước.',
          '[Điểm tựa visual] Vẽ dòng sông động có chiếc ca nô chạy xuôi dòng và ngược dòng.'
        ],
        keyVisuals: ['Mô hình dòng nước và vector ca nô', 'Phương trình quãng đường AB']
      },
      videoScript: [
        {
          timeSeconds: 0,
          speakerText: 'Chào các em học sinh lớp 8! Bài toán lập phương trình chuyển động dòng nước luôn là một thử thách thú vị.',
          motionGraphicNote: 'Hình ảnh ca nô di chuyển trên dòng sông có dòng chảy từ A sang B.',
          visualCue: 'Ca nô trên dòng sông hoạt họa'
        },
        {
          timeSeconds: 6,
          speakerText: 'Gọi vận tốc riêng ca nô là x. Khi xuôi dòng, ca nô được dòng nước đẩy thêm nên vận tốc là x + 2. Khi ngược dòng, ca nô bị cản lại nên vận tốc là x - 2.',
          motionGraphicNote: 'Biểu diễn: v_xuôi = x + 2 và v_ngược = x - 2.',
          visualCue: 'Biểu diễn hai vận tốc xuôi/ngược'
        },
        {
          timeSeconds: 15,
          speakerText: 'Quãng đường AB đi xuôi hết 4 giờ là 4 nhân (x + 2). Quãng đường ngược hết 5 giờ là 5 nhân (x - 2). Vì cùng là quãng đường AB nên chúng bằng nhau.',
          motionGraphicNote: 'Lập phương trình: 4(x + 2) = 5(x - 2).',
          visualCue: 'Thiết lập phương trình bằng nhau'
        },
        {
          timeSeconds: 23,
          speakerText: 'Hãy giải nhanh câu hỏi trắc nghiệm sau để xem bạn đã hiểu kỹ quy luật dòng nước chưa nhé!',
          motionGraphicNote: 'Tạm dừng video - Hiện Pop-up Quiz.',
          visualCue: 'Kích hoạt Pop-up Quiz'
        }
      ],
      popupQuiz: {
        question: 'Mối quan hệ giữa vận tốc xuôi dòng (v_xuôi), vận tốc ngược dòng (v_ngược) và vận tốc dòng nước (v_nước) là gì?',
        options: [
          'A. v_xuôi - v_ngược = v_nước',
          'B. v_xuôi - v_ngược = 2 × v_nước',
          'C. v_xuôi + v_ngược = v_nước',
          'D. Không có mối liên hệ nào'
        ],
        correctAnswerIndex: 1,
        explanation: 'Ta có: v_xuôi = v_riêng + v_nước và v_ngược = v_riêng - v_nước. Khi trừ hai vế: v_xuôi - v_ngược = 2 × v_nước.',
        gatekeeperMessage: 'Rất tốt! Bạn đã hiểu bản chất vật lý của chuyển động trên dòng nước!'
      },
      exercises: [
        {
          tier: '+10%',
          difficultyLabel: 'Cơ bản (+10%)',
          title: 'Bài tập 1: Xe máy đuổi nhau',
          problemText: 'Một xe máy đi từ A đến B với vận tốc 40 km/h. Khi quay về xe đi với vận tốc 30 km/h nên thời gian về nhiều hơn thời gian đi là 1 giờ. Tính quãng đường AB.',
          hint: 'Phương trình: S/30 - S/40 = 1 ⇒ 4S - 3S = 120 ⇒ S = 120 km.'
        },
        {
          tier: '+20%',
          difficultyLabel: 'Khá (+20%)',
          title: 'Bài tập 2: Ca nô nước chảy 3 km/h',
          problemText: 'Một ca nô xuôi dòng từ A đến B mất 3 giờ và ngược dòng từ B về A mất 4 giờ. Vận tốc dòng nước là 3 km/h. Tính khoảng cách AB.',
          hint: 'Phương trình: 3(x + 3) = 4(x - 3) ⇒ 3x + 9 = 4x - 12 ⇒ x = 21 km/h. S = 3 × 24 = 72 km.'
        },
        {
          tier: '+30%',
          difficultyLabel: 'Giỏi (+30%)',
          title: 'Bài tập 3: Khứ hồi có thời gian nghỉ',
          problemText: 'Một ca nô chạy xuôi dòng 36km rồi ngược dòng 36km hết tổng cộng 5 giờ. Biết vận tốc dòng nước là 3 km/h. Tính vận tốc riêng của ca nô.',
          hint: 'Phương trình: 36/(x + 3) + 36/(x - 3) = 5. Quy đồng mẫu số giải phương trình bậc hai tìm x = 15 km/h.'
        }
      ]
    },
    presetReport: {
      processScore: 88,
      scoreBreakdown: {
        logicalReasoning: 90,
        calculationAccuracy: 85,
        clarity: 90
      },
      errorHeatmap: [
        {
          stepName: 'Bước 1: Gọi ẩn & biểu diễn vận tốc',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Gọi ẩn đúng x và xác định v_xuôi = x+2, v_ngược = x-2.',
          studentAttempt: 'v_rieng = x. v_xuoi = x+2, v_nguoc = x-2',
          correctLogic: 'v_xuôi = x + 2, v_ngược = x - 2'
        },
        {
          stepName: 'Bước 2: Thiết lập phương trình',
          status: 'yellow',
          statusLabel: 'Sai số nhỏ',
          detail: 'Học sinh có sự nhầm lẫn nhỏ ban đầu khi lập phương trình (lấy 4(x - 2) = 5(x + 2) do nhầm thời gian đi ngược ít hơn đi xuôi), sau đó đã tự nhận ra lỗi sai vì ngược dòng phải đi lâu hơn và viết lại phương trình đúng.',
          studentAttempt: '4(x-2) = 5(x+2) -> sua lai: 4(x+2) = 5(x-2)',
          correctLogic: '4(x + 2) = 5(x - 2)'
        },
        {
          stepName: 'Bước 3: Giải x và tính S',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Giải chính xác phương trình tìm ra x = 18 và S = 80 km.',
          studentAttempt: '4x + 8 = 5x - 10 => x = 18. S = 4 * 20 = 80 km',
          correctLogic: 'x = 18, S = 80 km'
        }
      ],
      rootCauseAnalysis: {
        coreGap: 'Mối liên hệ giữa vận tốc và thời gian chuyển động',
        misconceptionType: 'Nhầm lẫn mối quan hệ nghịch biến giữa v và t',
        detailedExplanation: 'Học sinh ban đầu nhầm lẫn ghép thời gian ít hơn (4h) với vận tốc nhỏ hơn (x-2). Tuy nhiên học sinh đã nhanh chóng nhận biết và sửa lại.'
      },
      mentorFeedback: 'Lập luận toán học của em rất tốt! Việc tự phát hiện và sửa lại lỗi đảo ngược thời gian/vận tốc trên bảng nháp chứng minh tư duy thực tế của em rất vững vàng. Hãy tiếp tục phát huy nhé!',
      remedialRoadmap: {
        recapConceptName: 'Quan hệ tỉ lệ nghịch giữa Vận tốc và Thời gian',
        recapSummary: 'Trên cùng một quãng đường, vận tốc càng lớn thì thời gian đi càng ít. Vì v_xuôi > v_ngược nên t_xuôi < t_ngược.',
        quickFixQuestions: [
          {
            question: 'Một xe máy đi từ A đến B hết 2 giờ, đi ngược lại hết 3 giờ. Vận tốc lúc đi và lúc về quan hệ thế nào?',
            options: ['A. v_đi = 1.5 × v_về', 'B. v_về = 1.5 × v_đi', 'C. v_đi = v_về', 'D. v_đi = 2 × v_về'],
            correctAnswerIndex: 0,
            explanation: 'Vì quãng đường không đổi, S = 2 × v_đi = 3 × v_về ⇒ v_đi / v_về = 3/2 = 1.5.'
          },
          {
            question: 'Thời gian đi tỉ lệ như thế nào với vận tốc trên cùng quãng đường?',
            options: ['A. Tỉ lệ thuận', 'B. Tỉ lệ nghịch', 'C. Không tỉ lệ', 'D. Bằng nhau'],
            correctAnswerIndex: 1,
            explanation: 'Thời gian tỉ lệ nghịch với vận tốc trên cùng quãng đường.'
          },
          {
            question: 'Nếu v_xuôi = 20 km/h, v_ngược = 15 km/h. Vận tốc dòng nước là bao nhiêu?',
            options: ['A. 2.5 km/h', 'B. 5 km/h', 'C. 1.25 km/h', 'D. 3.5 km/h'],
            correctAnswerIndex: 0,
            explanation: 'v_nước = (v_xuôi - v_ngược) ÷ 2 = (20 - 15) ÷ 2 = 2.5 km/h.'
          },
          {
            question: 'Đi xuôi dòng 40km hết 2h, ngược dòng hết 4h. Vận tốc riêng ca nô là bao nhiêu?',
            options: ['A. 15 km/h', 'B. 10 km/h', 'C. 12 km/h', 'D. 16 km/h'],
            correctAnswerIndex: 0,
            explanation: 'v_xuôi = 20, v_ngược = 10. v_riêng = (v_xuôi + v_ngược) ÷ 2 = 15 km/h.'
          },
          {
            question: 'Vận tốc dòng nước là 3 km/h. Vận tốc xuôi dòng lớn hơn vận tốc ngược dòng bao nhiêu?',
            options: ['A. 6 km/h', 'B. 3 km/h', 'C. 1.5 km/h', 'D. 9 km/h'],
            correctAnswerIndex: 0,
            explanation: 'v_xuôi - v_ngược = 2 × v_nước = 6 km/h.'
          }
        ]
      }
    }
  },
  {
    id: 'toan-9-hpt',
    name: 'Toán 9: Hệ Phương Trình',
    subject: 'Toán Đại Số',
    grade: 'Lớp 9',
    previewText: 'Mảnh đất chu vi 40m. Tăng rộng 2m, giảm dài 3m thì diện tích giảm 8m². Tìm kích thước ban đầu.',
    input: {
      problemText: 'Một mảnh đất hình chữ nhật có chu vi là 40m. Nếu tăng chiều rộng thêm 2m và giảm chiều dài đi 3m thì diện tích mảnh đất giảm đi 8m². Tính chiều dài và chiều rộng ban đầu của mảnh đất.',
      gradeLevel: 'lop_9',
      tone: 'chuyên_sâu',
      subject: 'toán'
    },
    presetData: {
      ocrData: 'Chu vi = 40m. (Rộng + 2)(Dài - 3) = S - 8. Tính Dài, Rộng.',
      logicSteps: [
        {
          stepNumber: 1,
          title: 'Gọi ẩn và lập phương trình Chu vi',
          content: 'Gọi chiều dài ban đầu của mảnh đất là x (m), chiều rộng là y (m) (x > y > 3). Chu vi là 40m nên nửa chu vi là: x + y = 40 / 2 = 20 (m).',
          keyFormula: 'x + y = 20',
          keywords: ['Gọi chiều dài rộng', 'Nửa chu vi']
        },
        {
          stepNumber: 2,
          title: 'Thiết lập phương trình Thay đổi Diện tích',
          content: 'Diện tích ban đầu: xy (m²). Chiều dài mới: x - 3 (m); Chiều rộng mới: y + 2 (m). Diện tích mới: (x - 3)(y + 2) (m²). Theo đề bài, ta có phương trình: xy - (x - 3)(y + 2) = 8 ⇔ 3y - 2x = 2.',
          keyFormula: 'xy - (x - 3)(y + 2) = 8',
          keywords: ['Diện tích biến đổi', 'Rút gọn đa thức']
        },
        {
          stepNumber: 3,
          title: 'Giải hệ phương trình tìm x và y',
          content: 'Ta có hệ phương trình: { x + y = 20 ; -2x + 3y = 2 }. Giải hệ phương trình ta được x = 11 (thỏa mãn) và y = 9 (thỏa mãn). Vậy chiều dài là 11m, chiều rộng là 9m.',
          keyFormula: 'Hệ: { x+y=20 ; -2x+3y=2 }',
          keywords: ['Giải hệ phương trình', 'Chiều dài chiều rộng']
        }
      ],
      pedagogicalPrompt: {
        tone: 'Chuyên sâu, cấu trúc logic, giải tích đồ thị',
        pace: 'Vừa phải, làm kỹ bước khai triển đa thức để rút gọn ra phương trình số 2.',
        emphasisPoints: [
          '[Nhấn mạnh / Chậm lại] Lưu ý dấu trừ trước biểu thức diện tích mới: xy - (x - 3)(y + 2) = 8.',
          '[Điểm tựa visual] Vẽ hình chữ nhật ban đầu và các nét đứt biểu thị phần diện tích bị cắt bớt và thêm vào.'
        ],
        keyVisuals: ['Hình vẽ thay đổi diện tích hình chữ nhật', 'Biến đổi rút gọn đa thức trên bảng']
      },
      videoScript: [
        {
          timeSeconds: 0,
          speakerText: 'Chào các em học sinh lớp 9! Hôm nay chúng ta giải bài toán thực tế lập hệ phương trình về diện tích hình chữ nhật.',
          motionGraphicNote: 'Hình vẽ mảnh đất chữ nhật chu vi 40m xuất hiện.',
          visualCue: 'Hình chữ nhật kích thước x và y'
        },
        {
          timeSeconds: 6,
          speakerText: 'Gọi chiều dài là x, chiều rộng là y. Nửa chu vi là 20m, vậy phương trình thứ nhất rất đơn giản: x + y = 20.',
          motionGraphicNote: 'Viết phương trình (1): x + y = 20 bằng phấn trắng.',
          visualCue: 'Phương trình (1): x+y=20'
        },
        {
          timeSeconds: 12,
          speakerText: 'Khi giảm chiều dài 3m và tăng rộng 2m, diện tích mới là (x - 3) nhân (y + 2). Diện tích này nhỏ hơn diện tích cũ xy là 8m².',
          motionGraphicNote: 'Thiết lập phương trình: xy - (x - 3)(y + 2) = 8.',
          visualCue: 'Thiết lập phương trình diện tích'
        },
        {
          timeSeconds: 20,
          speakerText: 'Hãy nhẩm khai triển rút gọn thật kỹ biểu thức để tránh sai dấu trước khi làm câu hỏi sau nhé!',
          motionGraphicNote: 'Khai triển: xy - (xy + 2x - 3y - 6) = 8 ⇔ 3y - 2x = 2.',
          visualCue: 'Khai triển rút gọn phương trình (2)'
        },
        {
          timeSeconds: 28,
          speakerText: 'Bây giờ, chúng ta sẽ tạm dừng và trả lời câu hỏi trắc nghiệm chốt chặn.',
          motionGraphicNote: 'Tạm dừng video - Hiện Pop-up Quiz.',
          visualCue: 'Pop-up Quiz Gatekeeper'
        }
      ],
      popupQuiz: {
        question: 'Khi giải hệ phương trình bậc nhất hai ẩn bằng phương pháp thế hoặc cộng đại số, mục tiêu hàng đầu của chúng ta là gì?',
        options: [
          'A. Làm cho hệ phương trình phức tạp hơn',
          'B. Triệt tiêu một ẩn để đưa về phương trình một ẩn',
          'C. Đoán nghiệm trước',
          'D. Vẽ đồ thị hàm số'
        ],
        correctAnswerIndex: 1,
        explanation: 'Phương pháp cộng đại số hay thế đều nhằm mục đích đưa hệ phương trình hai ẩn về một phương trình duy nhất chứa một ẩn.',
        gatekeeperMessage: 'Chính xác! Bạn đã hiểu rõ mục tiêu triệt tiêu ẩn số trong đại số!'
      },
      exercises: [
        {
          tier: '+10%',
          difficultyLabel: 'Cơ bản (+10%)',
          title: 'Bài tập 1: Tìm hai số biết hiệu',
          problemText: 'Tìm hai số biết tổng của chúng là 30 và hiệu của chúng là 6.',
          hint: 'Hệ phương trình: { x + y = 30 ; x - y = 6 } ⇒ 2x = 36 ⇒ x = 18, y = 12.'
        },
        {
          tier: '+20%',
          difficultyLabel: 'Khá (+20%)',
          title: 'Bài tập 2: Tăng diện tích',
          problemText: 'Một mảnh đất hình chữ nhật có chu vi là 50m. Nếu tăng chiều rộng thêm 3m và giảm chiều dài đi 2m thì diện tích tăng thêm 10m². Tính kích thước ban đầu.',
          hint: 'Hệ: { x + y = 25 ; (x-2)(y+3) = xy + 10 } ⇔ { x + y = 25 ; 3x - 2y = 16 } ⇒ x = 13.2m, y = 11.8m.'
        },
        {
          tier: '+30%',
          difficultyLabel: 'Giỏi (+30%)',
          title: 'Bài tập 3: Diện tích không đổi',
          problemText: 'Một thửa ruộng hình chữ nhật có diện tích là 100m². Nếu tăng chiều rộng thêm 2m và giảm chiều dài đi 5m thì diện tích ruộng không thay đổi. Tính chu vi thửa ruộng.',
          hint: 'Hệ phương trình phi tuyến: { xy = 100 ; (x-5)(y+2) = 100 } ⇔ xy - 5y + 2x - 10 = 100 ⇒ 2x - 5y = 10.'
        }
      ]
    },
    presetReport: {
      processScore: 90,
      scoreBreakdown: {
        logicalReasoning: 92,
        calculationAccuracy: 88,
        clarity: 90
      },
      errorHeatmap: [
        {
          stepName: 'Bước 1: Gọi ẩn & lập phương trình 1',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Xác định nửa chu vi là 20 và lập phương trình x + y = 20.',
          studentAttempt: 'x + y = 20',
          correctLogic: 'x + y = 20'
        },
        {
          stepName: 'Bước 2: Lập phương trình diện tích',
          status: 'yellow',
          statusLabel: 'Sai số nhỏ',
          detail: 'Học sinh khai triển nhầm dấu khi phân tích đa thức trên bảng nháp: ghi nhầm thành 3y + 2x = 2 trước khi sửa lại thành 3y - 2x = 2.',
          studentAttempt: '3y + 2x = 2 (xóa) -> 3y - 2x = 2',
          correctLogic: '3y - 2x = 2'
        },
        {
          stepName: 'Bước 3: Giải hệ phương trình',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Giải chính xác hệ phương trình, tìm ra x = 11 và y = 9.',
          studentAttempt: 'x = 11, y = 9',
          correctLogic: 'x = 11, y = 9'
        }
      ],
      rootCauseAnalysis: {
        coreGap: 'Kỹ năng nhân đa thức và đổi dấu',
        misconceptionType: 'Nhầm dấu âm khi có dấu trừ phía trước ngoặc đơn',
        detailedExplanation: 'Học sinh dễ nhầm lẫn dấu khi thực hiện rút gọn biểu thức có dấu trừ phía trước: xy - (xy + 2x - 3y - 6) = 8. Việc phá ngoặc đổi dấu cần thực hiện chậm rãi.'
      },
      mentorFeedback: 'Thầy rất hoan nghênh tinh thần cẩn thận tự sửa lỗi nhầm dấu của em! Em đã làm chủ hệ phương trình rất tốt. Cố gắng giữ vững sự tập trung này nhé!',
      remedialRoadmap: {
        recapConceptName: 'Quy tắc phá ngoặc đổi dấu đa thức',
        recapSummary: 'Khi có dấu trừ đứng trước dấu ngoặc đơn: -(A + B - C) = -A - B + C. Phải đổi dấu của từng hạng tử bên trong ngoặc.',
        quickFixQuestions: [
          {
            question: 'Rút gọn biểu thức A = xy - (xy - 2x + 4) ta được kết quả nào?',
            options: ['A. 2x - 4', 'B. -2x + 4', 'C. 2x + 4', 'D. -2x - 4'],
            correctAnswerIndex: 0,
            explanation: 'A = xy - xy + 2x - 4 = 2x - 4.'
          },
          {
            question: 'Biểu thức -(x - y + z) bằng biểu thức nào sau đây?',
            options: ['A. -x + y - z', 'B. -x - y + z', 'C. -x + y + z', 'D. x - y - z'],
            correctAnswerIndex: 0,
            explanation: 'Phá ngoặc đổi dấu ta được -x + y - z.'
          },
          {
            question: 'Khai triển -(2a - 3)(b + 1) ta được gì?',
            options: ['A. -2ab - 2a + 3b + 3', 'B. -2ab + 2a - 3b - 3', 'C. 2ab - 2a + 3b - 3', 'D. -2ab - 2a - 3b + 3'],
            correctAnswerIndex: 0,
            explanation: '-(2ab + 2a - 3b - 3) = -2ab - 2a + 3b + 3.'
          },
          {
            question: 'Rút gọn 2x - (x - 5) ta được gì?',
            options: ['A. x + 5', 'B. x - 5', 'C. 3x - 5', 'D. 3x + 5'],
            correctAnswerIndex: 0,
            explanation: '2x - x + 5 = x + 5.'
          },
          {
            question: 'Rút gọn -(x² - 2x + 1) + x² ta được gì?',
            options: ['A. 2x - 1', 'B. -2x + 1', 'C. 2x + 1', 'D. -2x - 1'],
            correctAnswerIndex: 0,
            explanation: '-x² + 2x - 1 + x² = 2x - 1.'
          }
        ]
      }
    }
  }
];
