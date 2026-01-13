import { GoogleGenAI } from "@google/genai";
import { KPIS, REVENUE_DATA, TOP_INSTITUTIONS } from "./mockData";

const SYSTEM_PROMPT = `
你是一家大型在线教育SaaS平台的首席数据官。
你的目标是分析提供的仪表板JSON数据，并提供一份简明扼要、专业的执行摘要（中文）。
请关注以下几点：
1. 识别最重要的积极趋势。
2. 识别关键风险或需要关注的领域。
3. 为运营团队提出一项战略行动建议。
保持语气专业、商务且简洁（类似Salesforce的风格）。
使用Markdown格式。
`;

export const fetchDashboardInsights = async (): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Prepare context from our mock data
    const contextData = {
      kpis: KPIS,
      weeklyRevenueSamples: REVENUE_DATA,
      topInstitutions: TOP_INSTITUTIONS.slice(0, 3)
    };

    const prompt = `
      分析以下仪表板数据:
      ${JSON.stringify(contextData)}
      
      提供一份 "执行智能简报"，包含3个要点:
      - **市场脉搏:** 核心亮点是什么？
      - **风险预警:** 哪些数据看起来令人担忧？
      - **战略建议:** 下周我们应该采取什么行动？
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.2, // Low temperature for consistent, analytical results
      }
    });

    return response.text || "暂无智能分析结果。";
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return "## 智能服务暂时不可用\n\n目前无法生成实时洞察，请检查API配置。";
  }
};
