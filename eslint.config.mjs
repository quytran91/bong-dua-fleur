import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Trang này xuất tĩnh (output: "export"), nên bộ tối ưu ảnh của next/image
      // không chạy được — nó cần một server. Ảnh đã được nén sẵn thành WebP nhiều
      // kích thước bằng tools/build-images.py, và component <Photo> phát ra
      // <picture> kèm srcset + width/height thật, tức là vẫn đủ ba thứ mà quy tắc
      // này muốn bảo vệ: đúng kích thước, tải lười, và không gây layout shift.
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
