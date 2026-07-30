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
    id: 'quadratic-eq',
    name: 'Giải Phương Trình Bậc Hai (THPT)',
    subject: 'Toán Đại Số',
    grade: 'THPT / Lớp 10',
    previewText: 'Giải phương trình: 2x² - 5x + 2 = 0',
    input: {
      title: 'Phương trình bậc hai một ẩn',
      problemText: 'Giải phương trình: 2x² - 5x + 2 = 0 trên tập số thực ℝ.',
      gradeLevel: 'thpt',
      tone: 'chuyên_sâu',
      subject: 'toán'
    },
    presetData: {
      ocrData: 'Phương trình: 2x² - 5x + 2 = 0 (x ∈ ℝ)',
      logicSteps: [
        {
          stepNumber: 1,
          title: 'Xác định hệ số a, b, c',
          content: 'Xác định rõ các hệ số: a = 2, b = -5, c = 2',
          keyFormula: 'ax² + bx + c = 0',
          keywords: ['Hệ số', 'Đại số', 'Phương trình bậc 2']
        },
        {
          stepNumber: 2,
          title: 'Tính biệt thức Biệt số Delta (Δ)',
          content: 'Sử dụng công thức Δ = b² - 4ac. Thay số: Δ = (-5)² - 4(2)(2) = 25 - 16 = 9 > 0.',
          keyFormula: 'Δ = b² - 4ac',
          keywords: ['Delta', 'Biệt thức', 'Δ > 0']
        },
        {
          stepNumber: 3,
          title: 'Tính các nghiệm thực x₁, x₂',
          content: 'Vì Δ = 9 > 0, √Δ = 3. Phương trình có 2 nghiệm phân biệt: x₁ = (-b + √Δ)/(2a) = (5 + 3)/4 = 2, x₂ = (5 - 3)/4 = 1/2.',
          keyFormula: 'x = (-b ± √Δ) / (2a)',
          keywords: ['Nghiem phan biet', 'Can bac hai']
        }
      ],
      pedagogicalPrompt: {
        tone: 'Chuyên sâu, chuẩn xác, chú trọng tính chặt chẽ sư phạm',
        pace: 'Chậm ở bước tính Δ để tránh sai dấu (-5)²',
        emphasisPoints: [
          '[Nhấn mạnh / Chậm lại] Nhắc học sinh đóng mở ngoặc (-5)² = 25, tránh nhầm thành -25!',
          '[Điểm tựa visual] Hiển thị biểu đồ parabol cắt trục hoành tại x = 0.5 và x = 2'
        ],
        keyVisuals: ['Minh họa công thức Delta nhảy số', 'Đồ thị Parabol y = 2x² - 5x + 2']
      },
      videoScript: [
        {
          timeSeconds: 0,
          speakerText: 'Xin chào các em! Hôm nay chúng ta sẽ giải quyết bài toán phương trình bậc hai: 2x² - 5x + 2 = 0.',
          motionGraphicNote: 'Hiển thị phương trình 2x² - 5x + 2 = 0 nổi bật giữa màn hình',
          visualCue: 'Phương trình gốc xuất hiện'
        },
        {
          timeSeconds: 4,
          speakerText: 'Bước đầu tiên, hãy bóc tách hệ số a = 2, b = -5, c = 2. Hãy thật cẩn thận với dấu âm của hệ số b!',
          motionGraphicNote: 'Đánh dấu màu đỏ khoanh tròn hệ số b = -5',
          visualCue: 'Highlight hệ số a=2, b=-5, c=2'
        },
        {
          timeSeconds: 9,
          speakerText: 'Tiếp theo, ta tính Delta: b² - 4ac. Chú ý (-5)² là bằng dương 25 nhé!',
          motionGraphicNote: 'Biến đổi Δ = (-5)² - 4(2)(2) = 25 - 16 = 9',
          visualCue: 'Công thức Delta chớp sáng'
        },
        {
          timeSeconds: 15,
          speakerText: 'Bây giờ hãy thử kiểm tra lại kiến thức: Nếu Delta > 0 thì phương trình có bao nhiêu nghiệm?',
          motionGraphicNote: 'Dừng video - Xuất hiện bảng Pop-up Quiz chốt chặn',
          visualCue: 'Kích hoạt Pop-up Quiz gatekeeper'
        }
      ],
      popupQuiz: {
        question: 'Trong phương trình bậc hai ax² + bx + c = 0, nếu tính ra Biệt thức Δ = 9 (dương), thì phương trình có bao nhiêu nghiệm thực?',
        options: [
          'A. Vô nghiệm thực',
          'B. Có nghiệm kép x₁ = x₂',
          'C. Có 2 nghiệm phân biệt x₁ ≠ x₂',
          'D. Có vô số nghiệm'
        ],
        correctAnswerIndex: 2,
        explanation: 'Vì Δ = 9 > 0 nên phương trình bậc hai có 2 nghiệm thực phân biệt x₁ = 2 và x₂ = 0.5.',
        gatekeeperMessage: 'Chính xác! Bạn đã hiểu chốt chặn kiến thức này và có thể tiến sang Giai đoạn 3 (Bảng nháp Thích ứng).'
      },
      exercises: [
        {
          tier: '+10%',
          difficultyLabel: 'Cơ bản tương đương (+10%)',
          title: 'Bài tập 1: Phương trình hệ số dương',
          problemText: 'Giải phương trình: 3x² - 7x + 2 = 0',
          hint: 'Xác định a = 3, b = -7, c = 2. Tính Δ = (-7)² - 4(3)(2) = 49 - 24 = 25 = 5².'
        },
        {
          tier: '+20%',
          difficultyLabel: 'Vận dụng vừa (+20%)',
          title: 'Bài tập 2: Phương trình có nghiệm căn số',
          problemText: 'Giải phương trình: x² - 4x + 1 = 0',
          hint: 'Δ = (-4)² - 4(1)(1) = 12 = (2√3)². Nghiệm chứa căn thức x = 2 ± √3.'
        },
        {
          tier: '+30%',
          difficultyLabel: 'Vận dụng cao (+30%)',
          title: 'Bài tập 3: Chứa tham số m',
          problemText: 'Tìm điều kiện của m để phương trình x² - 2mx + (m² - 4) = 0 có 2 nghiệm phân biệt dương.',
          hint: 'Điều kiện: Δ > 0, S = x₁ + x₂ > 0, P = x₁·x₂ > 0.'
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
          stepName: 'Bước 1: Bóc tách hệ số',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Học sinh xác định chính xác hệ số a=2, b=-5, c=2.',
          studentAttempt: 'a = 2; b = -5; c = 2',
          correctLogic: 'a = 2, b = -5, c = 2'
        },
        {
          stepName: 'Bước 2: Tính Δ = b² - 4ac',
          status: 'yellow',
          statusLabel: 'Sai số / Nhầm lẫn nhỏ',
          detail: 'Phân tích bảng nháp cho thấy có sự ngập ngừng (3 vết xóa) khi tính (-5)². Ban đầu học sinh ghi -25 rồi sửa lại thành 25.',
          studentAttempt: 'Δ = -25 - 16 = ... (sửa lại 25 - 16 = 9)',
          correctLogic: '(-5)² = 25 ⇒ Δ = 25 - 16 = 9'
        },
        {
          stepName: 'Bước 3: Công thức nghiệm',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Áp dụng công thức nghiệm chính xác, x₁ = 2, x₂ = 0.5.',
          studentAttempt: 'x1 = (5 + 3)/4 = 2; x2 = (5 - 3)/4 = 0.5',
          correctLogic: 'x1 = 2; x2 = 1/2'
        }
      ],
      rootCauseAnalysis: {
        coreGap: 'Dấu lũy thừa âm (-a)²',
        misconceptionType: 'Lỗi nhầm lẫn giữa (-a)² và -a²',
        detailedExplanation: 'Học sinh có phản xạ viết (-5)² thành -25 do thiếu ngoặc đơn hoặc quen tay. Mặc dù đã tự phát hiện và sửa lại trên bảng nháp, đây vẫn là điểm yếu tiềm ẩn khi gặp các bài toán phức tạp hơn.'
      },
      mentorFeedback: 'Thầy rất khen ngợi tinh thần tự phát hiện và sửa lỗi của em trên bảng nháp! Lối tư duy giải phương trình của em rất mạch lạc. Hãy duy trì sự cẩn thận này nhé!',
      remedialRoadmap: {
        recapConceptName: 'Quy tắc dấu Lũy thừa bậc hai số âm',
        recapSummary: 'Ghi nhớ: Với mọi số thực k, (-k)² luôn mang dấu Dương (+) vì (-k) × (-k) = +k². Trong khi đó -k² có nghĩa là -(k²).',
        quickFixQuestion: {
          question: 'Giá trị của biểu thức P = (-3)² - 3² bằng bao nhiêu?',
          options: [
            'A. 0',
            'B. -18',
            'C. 18',
            'D. -9'
          ],
          correctAnswerIndex: 0,
          explanation: 'Vì (-3)² = 9 và 3² = 9, nên P = 9 - 9 = 0.'
        }
      }
    }
  },
  {
    id: 'elem-geometry',
    name: 'Hình Học Chu Vi & Diện Tích (Tiểu Học)',
    subject: 'Toán Tiểu Học',
    grade: 'Tiểu học / Lớp 4-5',
    previewText: 'Một hình chữ nhật có chu vi 48cm, chiều dài gấp 3 lần chiều rộng. Tính diện tích.',
    input: {
      title: 'Toán có lời văn Hình chữ nhật',
      problemText: 'Một thửa ruộng hình chữ nhật có chu vi là 48m. Chiều dài gấp 3 lần chiều rộng. Tính diện tích thửa ruộng đó.',
      gradeLevel: 'tiểu_học',
      tone: 'gần_gũi',
      subject: 'toán'
    },
    presetData: {
      ocrData: 'Chu vi = 48m. Chiều dài = 3 × Chiều rộng. Tính Diện tích S = ?',
      logicSteps: [
        {
          stepNumber: 1,
          title: 'Tính Nửa chu vi (Tổng chiều dài và chiều rộng)',
          content: 'Nửa chu vi = Chu vi ÷ 2 = 48 ÷ 2 = 24 (m).',
          keyFormula: 'Nửa chu vi = C / 2',
          keywords: ['Nửa chu vi', 'Tổng số phần']
        },
        {
          stepNumber: 2,
          title: 'Vẽ sơ đồ và Tính Tổng số phần bằng nhau',
          content: 'Coi chiều rộng là 1 phần, chiều dài là 3 phần. Tổng số phần = 1 + 3 = 4 (phần).',
          keyFormula: 'Tổng phần = 1 + 3 = 4',
          keywords: ['Sơ đồ đoạn thẳng', 'Tỉ số']
        },
        {
          stepNumber: 3,
          title: 'Tính Chiều rộng và Chiều dài',
          content: 'Chiều rộng = 24 ÷ 4 = 6 (m). Chiều dài = 6 × 3 = 18 (m).',
          keyFormula: 'Giá trị 1 phần = Tổng ÷ Tổng phần',
          keywords: ['Chiều dài', 'Chiều rộng']
        },
        {
          stepNumber: 4,
          title: 'Tính Diện tích',
          content: 'Diện tích = Chiều dài × Chiều rộng = 18 × 6 = 108 (m²).',
          keyFormula: 'S = Dài × Rộng',
          keywords: ['Diện tích', 'm²']
        }
      ],
      pedagogicalPrompt: {
        tone: 'Gần gũi, ấm áp, ngộ nghĩnh, dùng hình ảnh trực quan',
        pace: 'Chậm rãi, vui tươi như người anh/người thầy kể chuyện',
        emphasisPoints: [
          '[Nhấn mạnh / Chậm lại] Nhắc các bạn nhỏ tính NỬA CHU VI trước, tránh lấy 48 chia cho tổng số phần!',
          '[Điểm tựa visual] Sơ đồ đoạn thẳng mờ biến thành thanh kẹo socola 4 phần'
        ],
        keyVisuals: ['Thửa ruộng hình chữ nhật màu xanh', 'Sơ đồ 1 phần - 3 phần']
      },
      videoScript: [
        {
          timeSeconds: 0,
          speakerText: 'Chào bạn nhỏ! Hôm nay chúng mình cùng giúp bác nông dân tính diện tích thửa ruộng nhé!',
          motionGraphicNote: 'Hình ảnh thửa ruộng xanh mát tươi vui xuất hiện',
          visualCue: 'Thửa ruộng hoạt họa'
        },
        {
          timeSeconds: 5,
          speakerText: 'Chu vi cả thửa ruộng là 48m. Nhớ nhé, Chu vi là cả 2 lần chiều dài cộng 2 lần chiều rộng!',
          motionGraphicNote: 'Đường viền chạy quanh 4 cạnh thửa ruộng',
          visualCue: 'Bao quanh thửa ruộng'
        },
        {
          timeSeconds: 10,
          speakerText: 'Nên bước đầu tiên chúng mình tìm Nửa chu vi = 48 chia 2 = 24m nha.',
          motionGraphicNote: 'Chia đôi thành 1 Dài + 1 Rộng = 24m',
          visualCue: 'Nửa chu vi = 24m'
        },
        {
          timeSeconds: 15,
          speakerText: 'Hãy trả lời nhanh câu hỏi này trước khi vẽ sơ đồ đoạn thẳng nào!',
          motionGraphicNote: 'Tạm dừng video xuất hiện Pop-up Quiz',
          visualCue: 'Pop-up Quiz Tiểu học'
        }
      ],
      popupQuiz: {
        question: 'Tại sao khi giải bài toán tìm hai số khi biết Tổng và Tỉ số có liên quan đến Chu vi hình chữ nhật, bước đầu tiên phải tính Nửa Chu Vi?',
        options: [
          'A. Vì Nửa chu vi chính là Tổng của Chiều dài và Chiều rộng',
          'B. Vì Nửa chu vi là Diện tích hình chữ nhật',
          'C. Vì làm vậy cho bài toán ngắn hơn',
          'D. Vì Chu vi không liên quan đến Chiều dài'
        ],
        correctAnswerIndex: 0,
        explanation: 'Chu vi = (Dài + Rộng) × 2. Do đó Tổng của (Dài + Rộng) chính là Nửa Chu Vi = Chu vi ÷ 2.',
        gatekeeperMessage: 'Giỏi lắm! Em đã hiểu đúng bản chất Nửa chu vi là Tổng của Dài và Rộng!'
      },
      exercises: [
        {
          tier: '+10%',
          difficultyLabel: 'Cơ bản (+10%)',
          title: 'Bài tập 1: Thửa ruộng chu vi 60m',
          problemText: 'Một mảnh đất hình chữ nhật có chu vi 60m. Chiều dài gấp 2 lần chiều rộng. Tính diện tích.',
          hint: 'Nửa chu vi = 30m. Tổng số phần = 1 + 2 = 3 phần. Chiều rộng = 10m, Chiều dài = 20m.'
        },
        {
          tier: '+20%',
          difficultyLabel: 'Nâng cao (+20%)',
          title: 'Bài tập 2: Tỉ số dạng phân số',
          problemText: 'Một hình chữ nhật có chu vi 70cm. Chiều rộng bằng 2/3 chiều dài. Tính diện tích.',
          hint: 'Nửa chu vi = 35cm. Chiều rộng 2 phần, chiều dài 3 phần. Tổng số phần = 5.'
        },
        {
          tier: '+30%',
          difficultyLabel: 'Thách thức (+30%)',
          title: 'Bài tập 3: Mở rộng thửa ruộng',
          problemText: 'Một hình chữ nhật có chu vi 48m, nếu tăng chiều rộng thêm 4m thì thành hình vuông. Tính diện tích hình chữ nhật ban đầu.',
          hint: 'Dài - Rộng = 4m (Hiệu). Nửa chu vi = 24m (Tổng). Tìm hai số khi biết Tổng và Hiệu.'
        }
      ]
    },
    presetReport: {
      processScore: 92,
      scoreBreakdown: {
        logicalReasoning: 95,
        calculationAccuracy: 90,
        clarity: 90
      },
      errorHeatmap: [
        {
          stepName: 'Bước 1: Nửa chu vi',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Tính chính xác Nửa chu vi = 48/2 = 24m.',
          studentAttempt: 'Nuoc chu vi = 48 : 2 = 24 (m)',
          correctLogic: '24m'
        },
        {
          stepName: 'Bước 2: Sơ đồ & Tổng phần',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Vẽ sơ đồ đoạn thẳng trên bảng nháp rất nét, chia rõ 1 phần và 3 phần.',
          studentAttempt: 'Dài: |---|---|---| ; Rộng: |---| => 4 phần',
          correctLogic: '4 phần'
        },
        {
          stepName: 'Bước 3 & 4: Tính Dài, Rộng & Diện tích',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Rộng = 6m, Dài = 18m, S = 108 m². Đơn vị rõ ràng.',
          studentAttempt: 'S = 18 x 6 = 108 m2',
          correctLogic: '108 m²'
        }
      ],
      rootCauseAnalysis: {
        coreGap: 'Không có lỗ hổng lớn',
        misconceptionType: 'Tư duy hình học chuẩn xác',
        detailedExplanation: 'Học sinh nắm rất vững mạch tư duy chuyển đổi từ Chu vi sang Nửa chu vi và vẽ sơ đồ tỉ số.'
      },
      mentorFeedback: 'Tuyệt vời lắm! Bài làm của em vô cùng sạch đẹp, sơ đồ rõ ràng và tính toán chính xác 100%! Hãy tiếp tục phát huy nhé!',
      remedialRoadmap: {
        recapConceptName: 'Công thức Toán Tổng - Tỉ & Chu Vi',
        recapSummary: 'Muốn tìm 2 số khi biết Tổng và Tỉ: Số bé = (Tổng ÷ Tổng số phần) × Số phần số bé.',
        quickFixQuestion: {
          question: 'Nếu nửa chu vi là 30cm và chiều dài gấp 4 lần chiều rộng, thì chiều rộng bằng bao nhiêu cm?',
          options: [
            'A. 6 cm',
            'B. 5 cm',
            'C. 10 cm',
            'D. 12 cm'
          ],
          correctAnswerIndex: 0,
          explanation: 'Tổng phần = 1 + 4 = 5. Chiều rộng = 30 ÷ 5 = 6 cm.'
        }
      }
    }
  },
  {
    id: 'physics-kinematics',
    name: 'Vật Lý Rơi Tự Do (THPT)',
    subject: 'Vật Lý',
    grade: 'THPT / Lớp 10',
    previewText: 'Một vật rơi tự do từ độ cao h = 45m. Lấy g = 10 m/s². Tính thời gian rơi v và vận tốc chạm đất.',
    input: {
      title: 'Chuyển động rơi tự do',
      problemText: 'Một vật có khối lượng m = 1kg được thả rơi tự do không vận tốc đầu từ độ cao h = 45m so với mặt đất. Lấy gia tốc trọng trường g = 10 m/s². Tính: a) Thời gian t để vật rơi chạm đất. b) Vận tốc v của vật ngay trước khi chạm đất.',
      gradeLevel: 'thpt',
      tone: 'chuyên_sâu',
      subject: 'vật_lý'
    },
    presetData: {
      ocrData: 'm = 1kg; v₀ = 0; h = 45m; g = 10m/s². Tính t = ?; v_chạm_đất = ?',
      logicSteps: [
        {
          stepNumber: 1,
          title: 'Tóm tắt & Thiết lập công thức đường đi h',
          content: 'Rơi tự do là chuyển động thẳng nhanh dần đều với v₀ = 0, gia tốc a = g. Công thức: h = ½ g t².',
          keyFormula: 'h = ½ g t²',
          keywords: ['Rơi tự do', 'Gia tốc g', 'Không vận tốc đầu']
        },
        {
          stepNumber: 2,
          title: 'Rút t và Tính Thời gian rơi chạm đất',
          content: 'Từ h = ½ g t² ⇒ t² = 2h / g = (2 × 45) / 10 = 9 ⇒ t = √9 = 3 (giây).',
          keyFormula: 't = √(2h / g)',
          keywords: ['Thời gian rơi', 't = 3s']
        },
        {
          stepNumber: 3,
          title: 'Tính Vận tốc ngay trước khi chạm đất',
          content: 'Sử dụng công thức v = g t = 10 × 3 = 30 (m/s). Hoặc dùng v = √(2gh) = √(2 × 10 × 45) = √900 = 30 (m/s).',
          keyFormula: 'v = g t = √(2gh)',
          keywords: ['Vận tốc chạm đất', 'v = 30 m/s']
        }
      ],
      pedagogicalPrompt: {
        tone: 'Chuẩn mực Vật lý học, liên hệ thực tế lực hấp dẫn',
        pace: 'Vừa phải, nhấn mạnh ý nghĩa của v₀ = 0',
        emphasisPoints: [
          '[Nhấn mạnh / Chậm lại] Nhắc học sinh rơi tự do KHÔNG phụ thuộc vào khối lượng m = 1kg!',
          '[Điểm tựa visual] Quả cầu rơi xuống với thước đo thời gian và vận tốc tăng dần'
        ],
        keyVisuals: ['Mô phỏng vật rơi có vector gia tốc g hướng xuống', 'Đồ thị v-t tăng tuyến tính']
      },
      videoScript: [
        {
          timeSeconds: 0,
          speakerText: 'Chào các em! Hôm nay chúng ta nghiên cứu hiện tượng Rơi tự do dưới tác dụng của Trọng lực.',
          motionGraphicNote: 'Hình ảnh vật rơi từ độ cao 45m',
          visualCue: 'Vật thả rơi h = 45m'
        },
        {
          timeSeconds: 5,
          speakerText: 'Một chi tiết quan trọng: Khối lượng m = 1kg không xuất hiện trong công thức tính thời gian rơi!',
          motionGraphicNote: 'Gạch mờ khối lượng m=1kg để nhấn mạnh g và h quyết định',
          visualCue: 'Khối lượng m không ảnh hưởng'
        },
        {
          timeSeconds: 10,
          speakerText: 'Công thức đường đi h = 1/2 g t². Hãy bấm dừng và kiểm tra nhanh công thức rút thời gian t nhé!',
          motionGraphicNote: 'Biến đổi h = 1/2 g t² ⇒ t = √(2h/g)',
          visualCue: 'Công thức t = √(2h/g)'
        },
        {
          timeSeconds: 15,
          speakerText: 'Hãy trả lời câu hỏi Pop-up Quiz để chuẩn bị sang phần giải thực hành trên bảng nháp.',
          motionGraphicNote: 'Xuất hiện Pop-up Quiz Vật lý',
          visualCue: 'Pop-up Quiz Gatekeeper'
        }
      ],
      popupQuiz: {
        question: 'Nếu thả rơi tự do hai vật có khối lượng m₁ = 1kg và m₂ = 10kg từ cùng một độ cao h trong chân không, vật nào sẽ chạm đất trước?',
        options: [
          'A. Vật m₂ chạm đất trước vì nặng hơn',
          'B. Cả hai vật chạm đất cùng một lúc vì gia tốc rơi tự do g như nhau',
          'C. Vật m₁ chạm đất trước vì nhẹ hơn nên rơi nhanh hơn',
          'D. Phụ thuộc vào chất liệu của hai vật'
        ],
        correctAnswerIndex: 1,
        explanation: 'Trong chân không (bỏ qua sức cản không khí), thời gian rơi t = √(2h/g) hoàn toàn không phụ thuộc vào khối lượng m.',
        gatekeeperMessage: 'Chính xác! Bạn đã ghi nhớ bản chất vật lý độc lập với khối lượng của rơi tự do!'
      },
      exercises: [
        {
          tier: '+10%',
          difficultyLabel: 'Cơ bản (+10%)',
          title: 'Bài tập 1: Độ cao h = 20m',
          problemText: 'Một vật rơi tự do từ h = 20m, lấy g = 10 m/s². Tính t và v chạm đất.',
          hint: 't = √(2×20/10) = √4 = 2s. v = g·t = 20 m/s.'
        },
        {
          tier: '+20%',
          difficultyLabel: 'Vận dụng (+20%)',
          title: 'Bài tập 2: Tính giây cuối cùng',
          problemText: 'Một vật rơi tự do từ h = 45m (t = 3s). Tính quãng đường vật đi được trong giây cuối cùng.',
          hint: 'S(3s) = 45m. S(2s) = ½ × 10 × 2² = 20m. Quãng đường giây cuối = 45 - 20 = 25m.'
        },
        {
          tier: '+30%',
          difficultyLabel: 'Nâng cao (+30%)',
          title: 'Bài tập 3: Ném thẳng đứng xuống dưới',
          problemText: 'Ném một vật thẳng đứng hướng xuống từ h = 40m với v₀ = 10 m/s. Lấy g = 10 m/s². Tính thời gian chạm đất.',
          hint: 'Phương trình h = v₀ t + ½ g t² ⇒ 40 = 10t + 5t² ⇒ 5t² + 10t - 40 = 0.'
        }
      ]
    },
    presetReport: {
      processScore: 85,
      scoreBreakdown: {
        logicalReasoning: 88,
        calculationAccuracy: 80,
        clarity: 87
      },
      errorHeatmap: [
        {
          stepName: 'Bước 1: Tóm tắt & Công thức h',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'Học sinh áp dụng đúng công thức h = 1/2 g t².',
          studentAttempt: 'h = 0.5 * g * t^2',
          correctLogic: 'h = ½ g t²'
        },
        {
          stepName: 'Bước 2: Tính thời gian t',
          status: 'yellow',
          statusLabel: 'Sai số / Nhầm lẫn nhỏ',
          detail: 'Học sinh ghi t² = 9 nhưng có sự ngập ngừng quên căn bậc hai (ghi t = 9s trước khi xóa ghi lại t = 3s).',
          studentAttempt: 't^2 = 9 => t = 9s (xóa) => t = 3s',
          correctLogic: 't = √9 = 3s'
        },
        {
          stepName: 'Bước 3: Vận tốc chạm đất',
          status: 'green',
          statusLabel: 'Tư duy tốt',
          detail: 'v = g t = 10 * 3 = 30 m/s.',
          studentAttempt: 'v = 10 x 3 = 30 m/s',
          correctLogic: 'v = 30 m/s'
        }
      ],
      rootCauseAnalysis: {
        coreGap: 'Kỹ năng biến đổi đại số t² sang t',
        misconceptionType: 'Ngập ngừng tâm lý khi lấy căn bậc 2 đơn vị thời gian',
        detailedExplanation: 'Học sinh đôi khi nhầm lẫn giữa giá trị bình phương t² và giá trị căn thời gian t.'
      },
      mentorFeedback: 'Lối tư duy tóm tắt bài toán Vật lý của em rất chuẩn xác! Lỗi quên khai căn t² đã được em tự phát hiện. Rất khen ngợi sự tập trung của em!',
      remedialRoadmap: {
        recapConceptName: 'Khai căn thời gian trong Chuyển động biến đổi đều',
        recapSummary: 'Khi có t² = K (với K > 0), thời gian luôn nhận giá trị dương t = +√K.',
        quickFixQuestion: {
          question: 'Nếu t² = 16 (s²) trong công thức rơi tự do, giá trị thời gian t là bao nhiêu?',
          options: [
            'A. t = 16 giây',
            'B. t = 4 giây',
            'C. t = 8 giây',
            'D. t = 256 giây'
          ],
          correctAnswerIndex: 1,
          explanation: 't = √16 = 4 giây.'
        }
      }
    }
  }
];
