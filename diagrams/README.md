# Diagram Sistem I-HSSE Gedung J6

Kumpulan diagram alur untuk laporan/PI. File sumber yang bisa diedit ada di folder ini,
hasil gambar PNG ada di subfolder `png/`.

## Daftar diagram

| No | Diagram | File sumber | Gambar | Isi |
|----|---------|-------------|--------|-----|
| 1 | Use Case | `01-use-case.puml` | `png/01-use-case.png` | Aktor dan fitur website |
| 2 | Activity (swimlane) | `02-activity-chatbot.puml` | `png/02-activity-chatbot.png` | Alur chat AI per aktor |
| 3 | Sequence | `03-sequence-chat.mmd` | `png/03-sequence-chat.png` | Interaksi Browser, Server, OpenRouter |
| 4 | Flowchart | `04-flowchart-sistem.mmd` | `png/04-flowchart-sistem.png` | Alur pengunjung dari mulai sampai selesai |
| 5 | Arsitektur | `05-arsitektur.mmd` | `png/05-arsitektur.png` | Komponen sistem dan hubungannya |

> Catatan: diagram 1 dan 2 memakai **PlantUML** karena Mermaid tidak mendukung
> stick figure dan swimlane dengan panah antar-lane. Diagram 3–5 memakai **Mermaid**.

## Cara edit

**Mermaid (`.mmd`)**
1. Buka <https://mermaid.live>
2. Copy isi file `.mmd`, paste ke editor
3. Edit, lalu klik **Export → PNG**

**PlantUML (`.puml`)**
1. Buka <https://www.plantuml.com/plantuml/uml>
2. Copy isi file `.puml`, paste ke editor
3. Edit, lalu pilih format PNG di kanan bawah

## Cara render ulang (opsional)

Mermaid (butuh Node.js):
```powershell
npx --yes @mermaid-js/mermaid-cli -i diagrams\03-sequence-chat.mmd `
  -o diagrams\png\03-sequence-chat.png `
  -c diagrams\mermaid-config.json -b white --size 2400 -s 2
```

PlantUML (butuh Java):
```powershell
java -jar plantuml.jar -tpng -charset UTF-8 -Sdpi=200 `
  -o png diagrams\01-use-case.puml diagrams\02-activity-chatbot.puml
```

## Saran ukuran saat dimasukkan ke Word

| Diagram | Lebar disarankan |
|---------|------------------|
| Use Case | 14–15 cm |
| Activity | 15–16 cm (boleh satu halaman penuh) |
| Sequence | 15 cm |
| Flowchart | 13–14 cm |
| Arsitektur | 16 cm |

## Caption siap pakai

- **Gambar 1.** Use Case Diagram Sistem I-HSSE Gedung J6 Universitas Gunadarma
- **Gambar 2.** Activity Diagram Alur Penggunaan I-HSSE Assistant
- **Gambar 3.** Sequence Diagram Interaksi Chat AI
- **Gambar 4.** Flowchart Alur Sistem I-HSSE Gedung J6
- **Gambar 5.** Arsitektur Sistem I-HSSE Gedung J6

## Ringkasan alur

1. Pengunjung membuka website dan memilih menu Health, Safety, Security, Environment, atau Videos.
2. Tombol **AI Assistant** membuka panel chat. Browser mengecek status server lewat `GET /api/status`.
3. Pertanyaan dikirim ke `POST /api/chat` di `server.js`.
4. Server menyusun *system prompt* + riwayat percakapan, lalu memanggil OpenRouter (timeout 30 detik, retry maksimal 3 kali).
5. Jika berhasil, jawaban AI ditampilkan. Jika gagal, browser memakai basis pengetahuan lokal di `script-new.js`.
