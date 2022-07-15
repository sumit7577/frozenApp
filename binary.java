import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;

class binary {
    public static void main(String[] args) {
        try {
            Path path = Paths.get("./some.txt");
            byte[] buffer = java.nio.file.Files.readAllBytes(path);
            String[] testCases = { "frida", "hook" };
            for (int parent = 0; parent < testCases.length; parent++) {
                int bytes = 0;
                while (bytes < buffer.length) {
                    if ((int) buffer[bytes] == (int) testCases[parent].charAt(0)) {
                        String TotalSum = "";
                        String TotalSum2 = "";
                        for (int j = 0; j < testCases[parent].length(); j++) {
                            TotalSum += (char) testCases[parent].charAt(j);
                            TotalSum2 += (char) buffer[bytes + j];
                        }
                        if (TotalSum.equals(TotalSum2)) {
                            for (int i = 0; i < testCases[parent].length(); i++) {
                                int Name = RandomNumberGenerator();
                                byte bits = (byte) Name;
                                buffer[bytes] = bits;
                                bytes++;
                            }
                        } else {
                            bytes++;
                        }

                    } else {
                        bytes++;
                    }

                }
            }
            ;
            File targetFile = new File("./some.txt");
            OutputStream outputFile = new FileOutputStream(targetFile);
            outputFile.write(buffer);
            outputFile.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static int RandomNumberGenerator() {
        int MAX = 122;
        int MIN = 97;
        int Character = (int) (Math.random() * (MAX - MIN + 1) + MIN);
        return Character;
    }
}