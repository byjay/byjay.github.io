
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getDetailedGuide(entryName: string, description: string) {
  const prompt = `ZWCAD 공식 도움말(Official Help) 스타일로 "${entryName}"에 대한 상세 기술 문서를 작성해줘.
기존 요약: ${description}

다음 구조의 JSON으로 응답해줘:
1. usage: 전문가 수준의 상세 사용법 (단계별 설명, 마크다운 서식 사용)
2. examples: 실무에서 쓰이는 구체적인 명령 입력 시퀀스 및 예시 (리스트)
3. tips: 실무자가 반드시 알아야 할 고급 팁, 주의사항, 시스템 변수 연동 방법 (리스트)
4. related: 연관된 명령어 3~5개 (ID 리스트)
5. visualDescription: 이 기능의 도움말에 들어갈 '그림/도식'에 대한 상세한 텍스트 묘사. (예: "A 지점에서 B 지점으로 객체가 이동하는 화살표 도식")

언어: 한국어`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            usage: { type: Type.STRING },
            examples: { type: Type.ARRAY, items: { type: Type.STRING } },
            tips: { type: Type.ARRAY, items: { type: Type.STRING } },
            related: { type: Type.ARRAY, items: { type: Type.STRING } },
            visualDescription: { type: Type.STRING },
          },
          required: ["usage", "examples", "tips", "related", "visualDescription"],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Guide Error:", error);
    return null;
  }
}
